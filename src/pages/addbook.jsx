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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      title,
      author,
      genre,
      price,
      description,
      coverImage,
    });
  };

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
