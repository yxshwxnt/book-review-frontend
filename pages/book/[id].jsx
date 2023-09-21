import React from "react";
import { useRouter } from "next/router";
import { Image, Text, Button, Spacer } from "@nextui-org/react";
import Link from "next/link";

const BookDetail = () => {
  const router = useRouter();

  // Dummy book data for testing
  const book = {
    id: 1,
    title: "Sample Book 1",
    author: "Author 1",
    img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
    genre: "Fiction",
    publicationDate: "2022-01-15",
    isFree: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt risus eget nulla tristique, in feugiat augue tincidunt.",
  };

  // Check if the router is ready
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Link href="/catalog" className="text-blue-600 hover:underline">
        Back to Catalog
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <Image
            src={book.img}
            alt={`Cover for ${book.title}`}
            width="100%"
            height={400}
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{book.title}</h1>
          <p className="text-gray-600">{book.author}</p>
          <Spacer y={1} />
          <Text>{book.description}</Text>
          <Spacer y={2} />
          <div className="flex justify-between">
            <Text>Genre: {book.genre}</Text>
            <Text>{book.isFree ? "Free" : "Paid"}</Text>
          </div>
          <Spacer y={1} />
          <Text>Published: {book.publicationDate}</Text>
          <Spacer y={2} />
          <Button primary>Read Now</Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
