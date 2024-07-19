// src/components/BookForm.js
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const BookForm = ({ addBook }) => {
  const [book, setBook] = useState({ title: "", author: "", price: "" });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(book);
    setBook({ title: "", author: "", price: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Post a New Book</Typography>
      <TextField
        label="Title"
        name="title"
        value={book.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        name="author"
        value={book.author}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        value={book.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Post
      </Button>
    </Box>
  );
};

export default BookForm;
