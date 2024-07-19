// src/components/BookCard.js
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const BookCard = ({ book, purchaseBook }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="subtitle1">{book.author}</Typography>
        <Typography variant="body2">${book.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => purchaseBook(book)}>
          Purchase
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
