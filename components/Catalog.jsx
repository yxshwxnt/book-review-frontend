import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Image,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BookCard = ({ book }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.5 },
      }}
    >
      <Card
        shadow="sm"
        isPressable
        onPress={() => console.log("item pressed")}
        isFooterBlurred
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white/90 font-medium text-xl">
            {book?.title || "Unknown Title"}
          </h4>
          <p className="text-tiny text-white/60 uppercase font-bold">
            {book?.publication_date || "Unknown Date"}
          </p>
        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          src={book?.image_url || ""}
          alt={book?.title || ""}
          className="z-0 w-full h-full object-cover"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              className="rounded-full w-10 h-11 bg-black"
              src={book?.image_url || ""}
              alt={book?.title || ""}
            />
            <div className="grid grid-cols-2">
              <Link href={`/book/${book?._id?.$oid}`} key={book?._id?.$oid}>
                <p className="text-tiny text-white/60">
                  {book?.author || "Unknown Author"}
                </p>
                <p className="text-tiny text-white/60">
                  {book.is_free ? "Free" : book.price}
                </p>
              </Link>
            </div>
          </div>
          <Button radius="full" size="sm">
            <Link href={`/book/${book?._id?.$oid}`} key={book?._id?.$oid}>
              Read Reviews
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(10);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://book-review-backend-2l8f.onrender.com/get_books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthor(author);
  };

  const handleLoadMore = () => {
    setVisibleBooks(visibleBooks + 10);
  };

  const filteredBooksByGenre = selectedGenre
    ? books.filter((book) => book.genre === selectedGenre)
    : books;

  const filteredBooksByAuthor = selectedAuthor
    ? books.filter((book) =>
        book.author.toLowerCase().includes(selectedAuthor.toLowerCase())
      )
    : books;

  const searchedBooks = searchQuery
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  const combinedFilters = searchedBooks
    .filter((book) => !selectedGenre || book.genre === selectedGenre)
    .filter(
      (book) =>
        !selectedAuthor ||
        book.author.toLowerCase().includes(selectedAuthor.toLowerCase())
    );

  useEffect(() => {
    setLoadMoreVisible(visibleBooks < combinedFilters.length);
  }, [visibleBooks, combinedFilters]);

  const uniqueGenres = [...new Set(books.map((book) => book.genre))];
  const uniqueAuthors = [...new Set(books.map((book) => book.author))];

  return (
    <>
      <div className="container sm:px-10 py-6">
        <h1 className="text-3xl font-semibold mb-8">Book Catalog</h1>
        <div className="flex mb-8 mx-auto gap-2">
          <Input
            size="lg"
            className="mr-2"
            placeholder="Search books by title, author, or genre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="mr-2" onClick={() => setSearchQuery("")}>
            Clear
          </Button>
          <select
            value={selectedGenre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option value="">All Genres</option>
            {uniqueGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            value={selectedAuthor}
            onChange={(e) => handleAuthorChange(e.target.value)}
            className="rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="gap-2 grid grid-cols-2 sm:grid-cols-5 m-4">
          {combinedFilters.slice(0, visibleBooks).map((item, index) => (
            <BookCard key={index} book={item} />
          ))}
        </div>

        {loadMoreVisible && (
          <div className="text-center">
            <Button size="lg" onClick={handleLoadMore}>
              View More
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Catalog;
