import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function App() {
  return (
    <Navbar color={"danger"}>
      <NavbarBrand>
        <Link className="font-bold text-inherit" href="/Books">
          this.Book
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/Books">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/" color="foreground" aria-current="page">
            Landing Page
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/AddBook" variant="flat">
            Add New Book
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
