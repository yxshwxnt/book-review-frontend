import Header from "@/components/Header";
import BookCatalog from "@/components/Catalog";
import { Button, Text } from "@nextui-org/react";
import Link from "next/link";
import Details from "@/components/Details";

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
