import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  Image,
} from "@nextui-org/react";

const AddBook = () => {
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
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange("image_url", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend endpoint for creating a new book
      await axios.post("http://localhost:5000/new_book", formData);

      // Optionally, you can redirect to the book catalog or perform any other action
      // after successfully adding the book.

      // Clear the form
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
    } catch (error) {
      console.error("Error adding a new book:", error);
    }
  };

  return (
    <div className="p-4">
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publication_date" className="text-sm font-semibold">
              Publication Date
            </label>
            <input
              type="date"
              id="publication_date"
              name="publication_date"
              value={formData.publication_date || ""}
              onChange={(e) => handleChange("publication_date", e.target.value)}
              className="w-full"
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
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="is_free" className="text-sm font-semibold">
              Is Free
            </label>
            <select
              id="is_free"
              name="is_free"
              value={formData.is_free}
              onChange={(value) => handleChange("is_free", value)}
              options={[
                { label: "Free", value: true },
                { label: "Paid", value: false },
              ]}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-sm font-semibold">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image_url" className="text-sm font-semibold">
              Upload Book Cover
            </label>
            <Input
              type="file"
              id="image_url"
              name="image_url"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>
          <Button type="submit" auto>
            Add Book
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddBook;
