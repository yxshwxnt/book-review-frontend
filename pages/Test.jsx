import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function App() {
  return (
    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
      <Card
        shadow="sm"
        key={index}
        isPressable
        onPress={() => console.log("item pressed")}
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {item.publicationDate}
          </p>
          <h4 className="text-white/90 font-medium text-xl">Book Tite</h4>
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
            <div className="flex flex-col">
              <Link href={`/book/${item.id}`} key={item.id}>
                <p className="text-tiny text-white/60">{item.author}</p>
                <p className="text-tiny text-white/60">{item.price}</p>
              </Link>
            </div>
          </div>
          <Button radius="full" size="sm">
            Read Reviews
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
