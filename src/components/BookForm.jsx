import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const BookForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, description, image });
    setTitle("");
    setAuthor("");
    setDescription("");
    setImage("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Book
      </Button>
    </Box>
  );
};

export default BookForm;
