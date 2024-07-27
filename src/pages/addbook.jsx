import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Navbar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleCoverImageChange = (event) => {
    setCoverImage(event.target.files[0]);
  };

  // get jwt token

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  // handle form submission to store book in db
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("coverImage", coverImage);
      const response = await fetch(
        "http://localhost:3000/api/books/createbooks",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        toast.success("Book added successfully!");
        window.location.href = "/home";
      } else {
        toast.error("Failed to add book.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book.");
    }
  };

  // display form
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Add a New Book
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          variant="outlined"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          variant="outlined"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <FormControl variant="outlined" required>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            label="Genre"
          >
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Biography">Biography</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<AttachFileIcon />}
        >
          Upload Cover Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleCoverImageChange}
          />
        </Button>
        {coverImage && (
          <Typography variant="body2">{coverImage.name}</Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
      </Box>
    </Container>
  );
};

export default AddBook;
