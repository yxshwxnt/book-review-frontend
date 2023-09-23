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

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_books");
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

  const filteredBooksByGenre = selectedGenre
    ? books.filter((book) => book.genre === selectedGenre)
    : books;

  const filteredBooksByAuthor = selectedAuthor
    ? books.filter((book) => book.author.toLowerCase().includes(selectedAuthor.toLowerCase()))
    : books;

  const searchedBooks = searchQuery
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  const combinedFilters = searchedBooks
    .filter((book) => !selectedGenre || book.genre === selectedGenre)
    .filter((book) => !selectedAuthor || book.author.toLowerCase().includes(selectedAuthor.toLowerCase()));

  const uniqueGenres = [...new Set(books.map((book) => book.genre))];
  const uniqueAuthors = [...new Set(books.map((book) => book.author))];

  return (
    <div className="container sm:px-10 py-6">
      <h1 className="text-3xl font-semibold mb-8">Book Catalog</h1>
      <div className="flex mb-4 mx-auto gap-2">
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
        {combinedFilters.map((item, index) => (
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
              <h4 className="text-white/90 font-medium text-xl">{item.title}</h4>
            </CardHeader>
            <Image
              isZoomed
              removeWrapper
              src={item.image_url}
              alt={item.title}
              className="z-0 w-full h-full object-cover"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <Image
                  className="rounded-full w-10 h-11 bg-black"
                  src={item.image_url}
                  alt={item.title}
                />
                <div className="grid grid-cols-2">
                  <Link href={`/book/${item._id.$oid}`} key={item._id.$oid}>
                    <p className="text-tiny text-white/60">{item.author}</p>
                    <p className="text-tiny text-white/60">{item.price}</p>
                  </Link>
                </div>
              </div>
              <Button radius="full" size="sm">
                <Link href={`/book/${item._id.$oid}`} key={item._id.$oid}>
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
