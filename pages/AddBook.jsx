import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  Image,
} from "@nextui-org/react";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddBook = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAb1jvQGQjVZouy3GQ2xRicVbjeKQxHo7k",
    authDomain: "book-review-16afb.firebaseapp.com",
    projectId: "book-review-16afb",
    storageBucket: "book-review-16afb.appspot.com",
    messagingSenderId: "1066496988505",
    appId: "1:1066496988505:web:fd14ef69a195766bc02848",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: null,
    price: 0,
    is_free: false,
    description: "",
    image_url: "",
    reviews: [],
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((imageUrl) => {
          alert("Success");
          handleChange("image_url", imageUrl);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://book-review-backend-2l8f.onrender.com/new_book",
        formData
      );
      setFormData({
        title: "",
        author: "",
        genre: "",
        publication_date: null,
        price: 0,
        is_free: false,
        description: "",
        image_url: "",
        reviews: [],
      });
      alert('Added Book')
    } catch (error) {
      console.error("Error adding a new book:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
        <Card shadow>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="mb-4">
              <label htmlFor="title" className="text-sm font-semibold">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="text-sm font-semibold">
                Author
              </label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="genre" className="text-sm font-semibold">
                Genre
              </label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="publication_date"
                className="text-sm font-semibold"
              >
                Publication Date
              </label>
              <input
                type="date"
                id="publication_date"
                name="publication_date"
                value={formData.publication_date || ""}
                onChange={(e) =>
                  handleChange("publication_date", e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="text-sm font-semibold">
                Price
              </label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold">Is Free</label>
              <div className="flex items-center mt-2 space-x-4">
                <label>
                  <input
                    type="radio"
                    name="is_free"
                    value={true}
                    checked={formData.is_free === true}
                    onChange={() => handleChange("is_free", true)}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_free"
                    value={false}
                    checked={formData.is_free === false}
                    onChange={() => handleChange("is_free", false)}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-sm font-semibold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image_url" className="text-sm font-semibold">
                Upload Book Cover
              </label>
              <Input
                type="file"
                id="image_url"
                name="image"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <Button type="submit" auto color="primary">
              Add Book
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddBook;
