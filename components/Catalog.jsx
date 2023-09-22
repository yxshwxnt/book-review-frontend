import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(""); // State for selected genre filter
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Sample Book 1",
      author: "Author 1",
      img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
      genre: "Fiction",
      publicationDate: "2022-01-15",
      isFree: true,
    },
    {
      id: 2,
      title: "Sample Book 2",
      author: "Author 2",
      img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff_screen.jpg?ts=1637017516",
      genre: "Fiction",
      publicationDate: "2021-07-20",
      isFree: false,
    },
    {
      id: 3,
      title: "Sample Book 2",
      author: "Author 2",
      img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
      genre: "Fiction",
      publicationDate: "2021-07-20",
      isFree: true,
    },
    {
      id: 4,
      title: "Sample Book 2",
      author: "Author 2",
      img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff_screen.jpg?ts=1637017516",
      genre: "Horror",
      publicationDate: "2021-07-20",
      isFree: false,
    },
    {
      id: 5,
      title: "Sample Book 2",
      author: "Author 2",
      img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
      genre: "Non-fiction",
      publicationDate: "2021-07-20",
      isFree: false,
    },
  ]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_books");
        setBooks(response.data);
        console.log(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    // fetchBooks();
  }, []);

  const handleSearch = async () => {
    // Implement fetching books from the backend based on the searchQuery
    // Update the 'books' state with the fetched data
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  // Filter books based on the selected genre
  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genre === selectedGenre)
    : books;

  const uniqueGenres = [...new Set(books.map((book) => book.genre))];

  return (
    <div className="container sm:px-10 py-6">
      <h1 className="text-3xl font-semibold mb-8">Book Catalog</h1>
      <div className="flex mb-4 mx-auto gap-2">
        <Input
          size="lg"
          className="mr-2"
          placeholder="Search books by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch} className="mr-2">
          Search
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
      </div>

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-4">
        {books
          .filter((item) => !selectedGenre || item.genre === selectedGenre)
          .map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log("item pressed")}
              isFooterBlurred
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {item.publicationDate}
                </p>
                <h4 className="text-white/90 font-medium text-xl">
                  {item.title}
                </h4>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                src={item.img}
                alt={item.title}
                className="z-0 w-full h-full object-cover"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    className="rounded-full w-10 h-11 bg-black"
                    src={item.img}
                    alt={item.title}
                  />
                  <div className="grid grid-cols-2">
                    <Link href={`/book/${item.id}`} key={item.id}>
                      <p className="text-tiny text-white/60">{item.author}</p>
                      <p className="text-tiny text-white/60">{item.price}</p>
                    </Link>
                  </div>
                </div>
                <Button radius="full" size="sm">
                  <Link href={`/book/${item.id}`} key={item.id}>
                    Read Reviews
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Catalog;
