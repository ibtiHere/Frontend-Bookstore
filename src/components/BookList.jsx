// src/components/BookList.js
import React from "react";
import { Box, Grid } from "@mui/material";
import BookCard from "./bookCard";

const BookList = ({ books, purchaseBook }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <BookCard book={book} purchaseBook={purchaseBook} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;
