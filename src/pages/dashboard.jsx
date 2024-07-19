import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import Navbar from "../components/NavBar";
// import { getBooks } from "../services/bookService"; // Ensure the correct path

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
    sortBooks(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortBooks = (criteria) => {
    const sortedBooks = [...books];
    if (criteria === "title") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "author") {
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (criteria === "price") {
      sortedBooks.sort((a, b) => a.price - b.price);
    }
    setBooks(sortedBooks);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search books..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mr: 2, flexGrow: 2 }}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortCriteria}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} mt={3}>
            {filteredBooks.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{book.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {book.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${book.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
