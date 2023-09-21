import React from "react";
import { useRouter } from "next/router";
import { Image, Text, Button, Spacer } from "@nextui-org/react";
import Link from "next/link";
import Header from "@/components/Header";

const BookDetail = () => {
  const router = useRouter();

  const book = {
    id: 1,
    title: "Sample Book 1",
    author: "Author 1",
    img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
    genre: "Fiction",
    publicationDate: "2022-01-15",
    isFree: true,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt risus eget nulla tristique, in feugiat augue tincidunt.",
  };

  // Check if the router is ready
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="grid grid-col-1 sm:grid-cols-2 gap-2 mt-6">
        <div className="m-12">
          <Image
            src={book.img}
            alt={`Cover for book.title`}
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
          <p>Published: book.publicationDate</p>
          <div className="sm:pr-20">
            <h3 className="text-2xl">Description:</h3>
            <p>
              {book.desc}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
