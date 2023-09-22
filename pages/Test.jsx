import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { Button } from "@nextui-org/react";
import Header from "@/components/Header";
import Link from "next/link";
import { FaBookOpen, FaStar, FaSearch, FaHeart } from "react-icons/fa";

const Fullpage = () => (
  <ReactFullpage
    scrollingSpeed={1000}
    scrollHorizontally={true}
    render={({ state, fullpageApi }) => {
      return (
        <>
          <ReactFullpage.Wrapper>
            <div className="section bg-[url('https://wallpapers.com/images/hd/design-background-qwq0y5ay5j8lw2ds.jpg')] h-fill">
              <div className="text-center">
                <h1 className="text-center text-8xl font-extrabold text-white mb-4">
                  Discover Your Next Adventure
                </h1>
                <p className="text-3xl font-semibold text-indigo-600 mb-10">
                  Dive into a World of Books and Reviews
                </p>
                <Link href="/catalog">
                  <Button
                    flat
                    onClick={() => fullpageApi.moveSectionDown()}
                    className="text-3xl p-10 bg-indigo-600 text-white hover:bg-opacity-80"
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
                      <FaSearch className="text-4xl" />
                    </div>
                    <h3 className="text-3xl font-semibold mb-4">
                      Personalized Suggestions
                    </h3>
                    <p className="text-xl">
                      Get tailored book recommendations based on your
                      preferences.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white rounded-full p-4 mb-4 text-indigo-600">
                      <FaHeart className="text-4xl" />
                    </div>
                    <h3 className="text-3xl font-semibold mb-4">
                      Save Favorites
                    </h3>
                    <p className="text-xl">
                      Curate your reading list by saving your favorite books.
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
);

export default Fullpage;
