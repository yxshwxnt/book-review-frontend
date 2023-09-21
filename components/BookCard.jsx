// {
//     id: 3,
//     title: "Sample Book 2",
//     author: "Author 2",
//     img: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
//     genre: "Non-fiction",
//     publicationDate: "2021-07-20",
//     isFree: false,
//   },
// const BookCard = ({ book }) => {
//   return (
//     <>
//       <Card shadow className="h-full">
//         <Image
//           src={book.coverImage}
//           alt={`Cover for ${book.title}`}
//           width="100%"
//           height={200}
//           objectFit="cover"
//         />
//         <Spacer y={1} />
//         <Text h6 className="mb-2">
//           {book.title}
//         </Text>
//         <Text small className="text-gray-600">
//           {book.author}
//         </Text>
//         <Spacer y={0.5} />
//         <div className="flex justify-between">
//           <Text small>Genre: {book.genre}</Text>
//           <Text small>{book.isFree ? "Free" : "Paid"}</Text>
//         </div>
//         <Spacer y={1} />
//         <Text small>Published: {book.publicationDate}</Text>
//       </Card>
//     </>
//   );
// };

// export default BookCard;
