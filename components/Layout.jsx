import React from "react";
import Header from "./Header"; // You can create a Header component separately

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
