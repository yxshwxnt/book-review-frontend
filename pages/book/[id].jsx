import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Image,
  Text,
  Button,
  Spacer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const BookDetail = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); 
  // const [book, setBook] = useState([]); 

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
  });

  const fetchBookDetails = async () => {
    try {
      const bookId = router.query.id;
      const response = await axiosInstance.get(`/get_book/${bookId}`);
      const bookDetails = response.data;
      setRating(0);
      setComment("");
      setReviews(bookDetails.reviews);
    } catch (error) {
      console.error("Error loading book details:", error);
    }
  };

  const handleAddReview = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and comment.");
      return;
    }
    try {
      const bookId = router.query.id;
      const reviewData = {
        user: "User1", 
        rating: rating,
        comment: comment,
      };
      await axiosInstance.post(`/add_review/${bookId}`, reviewData);
      fetchBookDetails(); 
      onOpenChange(false); 
    } catch (error) {
      console.error("Error adding book review:", error);
    }
  };
  

  useEffect(() => {
    fetchBookDetails();
  }, [router.query.id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const book = {
    id: 1,
    title: "Sample Book 1",
    author: "Author 1",
    img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
    genre: "Fiction",
    publicationDate: "2022-01-15",
    isFree: true,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt risus eget nulla tristique, in feugiat augue tincidunt.",
    reviews: [
      {
        id: 1,
        user: "User1",
        rating: 4,
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quasi tempora quos eligendi molestias, corrupti ipsum, fuga dolor sint numquam aspernatur tempore facilis dolores praesentium enim quod sapiente ipsam repudiandae et neque perferendis placeat. Expedita fugiat iure illum dignissimos ratione tempora doloremque a pariatur id similique vel maiores reprehenderit quae aut cum consequatur, maxime debitis, blanditiis omnis ullam mollitia. Veritatis quam fugiat corporis expedita nostrum, totam error reiciendis necessitatibus voluptatem voluptas iure labore hic aut odit eos minima iste similique quia corrupti ratione architecto veniam maxime dolore? Sit maiores corporis quis commodi perferendis. Placeat aliquid, nobis quae quisquam cum, neque quia maxime totam voluptates ullam repellendus deserunt eveniet autem fuga accusamus labore ab? Et cum neque maxime mollitia dignissimos sit, nihil saepe dolore.",
      },
      {
        id: 2,
        user: "User2",
        rating: 5,
        comment: "A must-read!",
      },
    ],
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
        <div className="m-12">
          <Image
            src={book.img}
            alt={`Cover for ${book.title}`}
            width="100%"
            height={100}
            objectFit="cover"
          />
        </div>
        <div className="text-left flex flex-col gap-2 mt-12 m-10">
          <h1 className="text-5xl font-semibold mb-2 mt-2">{book.title}</h1>
          <p className="text-gray-600">{book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>{book.isFree ? "Free" : "Paid"}</p>
          <p>Published: {book.publicationDate}</p>
          <div className="sm:pr-20">
            <h3 className="text-2xl">Description:</h3>
            <p>{book.desc}</p>
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold mb-4">Book Reviews</h2>
              <Button color="warning" onPress={onOpen}>
                Add Your Review
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Book Review
                      </ModalHeader>
                      <ModalBody>
                        <h2 className="text-2xl font-semibold mb-4">
                          Add Your Review
                        </h2>
                        <div className="flex items-center gap-2">
                          <p>Rating:</p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() => handleRatingChange(star)}
                                className={`cursor-pointer ${
                                  star <= rating
                                    ? "text-warning"
                                    : "text-default"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <Spacer y={1} />
                        <textarea
                          rows="4"
                          placeholder="Write your review..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="primary"
                          onPress={onClose}
                          onClick={handleAddReview}
                        >
                          Add Review
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
            {book.reviews.map((review) => (
              <div key={review.id} className="border p-4 mb-4 rounded-lg">
                <h3 className="text-xl font-semibold">{review.user}</h3>
                <p>Rating: {review.rating} stars</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
