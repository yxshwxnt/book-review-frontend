import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaBookOpen, FaStar, FaSearch, FaHeart, FaEdit, FaPlusCircle  } from "react-icons/fa";

const Fullpage = () => {
  const [activeSection, setActiveSection] = useState(0);

  const handleSectionChange = (sectionIndex) => {
    setActiveSection(sectionIndex);
  };

  return (
    <>
      <ReactFullpage
        scrollingSpeed={1000}
        scrollHorizontally={true}
        render={({ state, fullpageApi }) => {
          return (
            <>
              <ReactFullpage.Wrapper>
                <div className="section bg-[url('../assets/bg.jpg')] h-fill">
                  <div className="text-center">
                    <h1 className="text-center m-4 mb-4 sm:mb-4 text-6xl sm:text-8xl font-extrabold text-white ">
                      Discover Your Next Adventure
                    </h1>
                    <p className="text-3xl m-4 mb-10 sm:mb-10 sm:text-4xl font-semibold text-indigo-600">
                      Dive into a World of Books and Reviews
                    </p>
                    <Link href="/Books">
                      <Button
                        flat
                        className="text-2xl sm:text-3xl p-10 bg-indigo-600 text-white hover:bg-opacity-80"
                      >
                        Explore Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="section bg-indigo-600">
                  <div className="text-center text-white m-3">
                    <h2 className="text-5xl font-semibold mb-10">
                      Discover Exciting Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                      <div className="flex flex-col items-center">
                        <div className="bg-white rounded-full p-4 mb-4 text-indigo-600">
                          <FaBookOpen className="text-4xl" />
                        </div>
                        <h3 className="text-3xl font-semibold mb-4">
                          Extensive Collection
                        </h3>
                        <p className="text-xl">
                          Explore a diverse library of books across genres and
                          topics.
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-white rounded-full p-4 mb-4 text-indigo-600">
                          <FaStar className="text-4xl" />
                        </div>
                        <h3 className="text-3xl font-semibold mb-4">
                          User Reviews
                        </h3>
                        <p className="text-xl">
                          Read reviews and recommendations from fellow book
                          enthusiasts.
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-white rounded-full p-4 mb-4 text-indigo-600">
                          <FaEdit className="text-4xl" />
                        </div>
                        <h3 className="text-3xl font-semibold mb-4">
                          Add Your Own Review
                        </h3>
                        <p className="text-xl">
                          Share your thoughts and insights by writing book
                          reviews.
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-white rounded-full p-4 mb-4 text-indigo-600">
                          <FaPlusCircle className="text-4xl" />
                        </div>
                        <h3 className="text-3xl font-semibold mb-4">
                          Add New Book
                        </h3>
                        <p className="text-xl">
                          Contribute to our collection by adding new books to
                          the library.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ReactFullpage.Wrapper>
            </>
          );
        }}
      />
    </>
  );
};

export default Fullpage;
