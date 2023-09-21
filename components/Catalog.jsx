import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
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
      isFree: false,
    },
    {
      id: 4,
      title: "Sample Book 2",
      author: "Author 2",
      img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
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

      <div className="gap-2 grid grid-cols-1 sm:grid-cols-4 m-4">
        {books.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                isZoomed
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <Link href={`/book/${item.id}`} key={item.id}>
                <b>{item.title}</b>
                <p className="text-default-500">{item.author}</p>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
