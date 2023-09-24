import Header from "@/components/Header";
import BookCatalog from "@/components/Catalog";
import { Button, Text } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <BookCatalog /> 
      </div>
    </>
  );
}
