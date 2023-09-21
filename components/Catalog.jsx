import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
} from "@nextui-org/react";
import Link from "next/link";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
      img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
      genre: "Non-fiction",
      publicationDate: "2021-07-20",
      isFree: false,
    },
    {
      id: 3,
      title: "Sample Book 2",
      author: "Author 2",
      img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
      genre: "Non-fiction",
      publicationDate: "2021-07-20",
      isFree: true,
    },
    {
      id: 4,
      title: "Sample Book 2",
      author: "Author 2",
      img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff_screen.jpg?ts=1637017516",
      genre: "Non-fiction",
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
    // Add more sample book objects here
  ]);

  const handleSearch = async () => {
    // Implement fetching books from the backend based on the searchQuery
    // Update the 'books' state with the fetched data
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-4">Book Catalog</h1>
      <div className="flex">
        <Input
          size="lg"
          className="mb-2"
          placeholder="Search books by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch} className="mb-4">
          Search
        </Button>
      </div>

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-4">
        {books.map((item, index) => (
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
