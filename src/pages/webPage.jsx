import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Alert,
  AppBar,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const WebPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

  // Fetch books from the server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/books/getbooks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized. Please log in.");
          } else {
            setError("Failed to fetch books.");
          }
          setBooks([]); // Clear books state on error
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.error("Fetched data is not an array:", data);

          setError("Failed to fetch books.");
          setBooks([]); // Clear books state on error
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Error fetching books.");
        setBooks([]); // Clear books state on error
        setLoading(false);
      }
    };

    fetchBooks();

    return () => {
      // Cleanup function: Clear state when component unmounts
      setBooks([]);
      setError(null);
      setLoading(true);
    };
  }, [token]);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortedBooks = useMemo(() => {
    const sorted = [...books];
    if (sortCriteria === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === "author") {
      sorted.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortCriteria === "price") {
      sorted.sort((a, b) => a.price - b.price);
    }
    return sorted;
  }, [books, sortCriteria]);

  const filteredBooks = useMemo(() => {
    return sortedBooks.filter((book) => {
      // Guard against undefined book.title
      if (book.title) {
        return book.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false; // Or handle as per your application's logic
    });
  }, [sortedBooks, searchQuery]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="lg">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                BookStore
              </Typography>
              <Box>
                <Button
                  onClick={() => navigate("/login")}
                  color="inherit"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: "whitesmoke",
                    color: "black",
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  color="inherit"
                  sx={{ marginLeft: 2, backgroundColor: "red" }}
                >
                  Signup
                </Button>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 5 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search books..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mr: 2, flexGrow: 1 }}
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
        ) : error ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : (
          <Grid container spacing={3} mt={3}>
            {filteredBooks.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4}>
                <Card>
                  <Box sx={{ height: 300, overflow: "hidden" }}>
                    <img
                      src={`http://localhost:3000/${book.coverImage}`}
                      alt={book.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Book Title: {book.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Genre: {book.genre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${book.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description: {book.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button
                        onClick={() => handleBuyNow(book.id)}
                        variant="contained"
                        color="primary"
                      >
                        Buy Now
                      </Button>
                      <Button
                        onClick={() => handleAddToCart(book.id)}
                        variant="outlined"
                        color="secondary"
                      >
                        Add to Cart
                      </Button>
                    </Box>
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

export default WebPage;
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Container,
//   Grid,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   TextField,
//   Alert,
//   Button,
// } from "@mui/material";
// import Navbar from "../components/NavBar";

// const Dashboard = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortCriteria, setSortCriteria] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

//   // Fetch books from the server
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/api/books/getbooks",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError("Unauthorized. Please log in.");
//           } else {
//             setError("Failed to fetch books.");
//           }
//           setBooks([]); // Clear books state on error
//           setLoading(false);
//           return;
//         }

//         const data = await response.json();
//         if (Array.isArray(data.books)) {
//           setBooks(data.books);
//         } else {
//           console.error("Fetched data is not an array:", data);

//           setError("Failed to fetch books.");
//           setBooks([]); // Clear books state on error
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         setError("Error fetching books.");
//         setBooks([]); // Clear books state on error
//         setLoading(false);
//       }
//     };

//     fetchBooks();

//     return () => {
//       // Cleanup function: Clear state when component unmounts
//       setBooks([]);
//       setError(null);
//       setLoading(true);
//     };
//   }, [token]);

//   const handleSortChange = (event) => {
//     setSortCriteria(event.target.value);
//   };

//   const handleBuyNow = (bookId) => {
//     // Handle the "Buy Now" action
//     console.log("Buying book with ID:", bookId);
//     // Implement the actual purchase logic here
//   };

//   const handleAddToCart = (bookId) => {
//     // Handle the "Add to Cart" action
//     console.log("Adding book with ID:", bookId, "to cart");
//     // Implement the actual add to cart logic here
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const sortedBooks = useMemo(() => {
//     const sorted = [...books];
//     if (sortCriteria === "title") {
//       sorted.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (sortCriteria === "author") {
//       sorted.sort((a, b) => a.author.localeCompare(b.author));
//     } else if (sortCriteria === "price") {
//       sorted.sort((a, b) => a.price - b.price);
//     }
//     return sorted;
//   }, [books, sortCriteria]);

//   const filteredBooks = useMemo(() => {
//     return sortedBooks.filter((book) => {
//       // Guard against undefined book.title
//       if (book.title) {
//         return book.title.toLowerCase().includes(searchQuery.toLowerCase());
//       }
//       return false; // Or handle as per your application's logic
//     });
//   }, [sortedBooks, searchQuery]);

//   return (
//     <div>
//       <Navbar />

//     </div>
//   );
// };

// export default Dashboard;
