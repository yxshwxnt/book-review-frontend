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
  Skeleton,
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
  const [userName, setUserName] = useState("");
  const [book, setBook] = useState([]);

  const fetchBookDetails = async () => {
    try {
      const bookId = router.query.id;
      const response = await axios.get(
        `http://localhost:5000/get_book/${bookId}`
      );
      setBook(response.data);
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
        user: userName,
        rating: rating,
        comment: comment,
      };
      await axios.post(
        `http://localhost:5000/add_review/${bookId}`,
        reviewData
      );
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

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
        <div className="m-12">
          <Image
            src={book.image_url}
            alt={`Cover for ${book.title}`}
            width="100%"
            height={100}
            objectFit="cover"
          />
        </div>
        <div className="text-left flex flex-col gap-2 mt-12 m-10">
          <h1 className="text-5xl font-semibold mt-2 underline">
            {book.title}
          </h1>
          <p className="text-2xl text-gray-400 underline mb-2">{book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>{book.is_free ? "Free" : "Paid"}</p>
          <p>Published: {book.publication_date}</p>
          <div className="sm:pr-20">
            <h3 className="text-2xl">Description:</h3>
            <p>{book.description}</p>
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
                      <ModalHeader className="text-3xl flex flex-col gap-1 font-bold">
                        {book.title}
                      </ModalHeader>
                      <ModalBody>
                        <h2 className="text-xl font-semibold mb-4">
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
                        <div className="mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Your Name:
                          </label>
                          <input
                            type="text"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
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
            {book ? (
              book.reviews ? (
                book.reviews.map((review) => (
                  <div key={review.id} className="border p-4 mb-4 rounded-lg">
                    <h3 className="text-xl font-semibold">{review.user}</h3>
                    <p className="text-gray-400">
                      Rating:{" "}
                      <span className="font-semibold underline">
                        {review.rating} stars
                      </span>
                    </p>
                    <p className="text-large">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="border p-4 mb-4 rounded-lg animate-pulse">
                <h3 className="text-xl font-semibold bg-gray-200 h-8 w-1/4"></h3>
                <p className="text-gray-200 bg-gray-100 h-6 w-1/2 mt-2"></p>
                <p className="text-gray-200 bg-gray-100 h-6 w-3/4 mt-2"></p>
              </div>
              )
            ) : (
              <div className="border p-4 mb-4 rounded-lg animate-pulse">
                <h3 className="text-xl font-semibold bg-gray-200 h-8 w-1/4"></h3>
                <p className="text-gray-200 bg-gray-100 h-6 w-1/2 mt-2"></p>
                <p className="text-gray-200 bg-gray-100 h-6 w-3/4 mt-2"></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
