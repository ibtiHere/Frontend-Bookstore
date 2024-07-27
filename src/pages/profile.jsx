// page to show my profile info

import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  // Implement profile update logic here

  console.log("Profile updated:", { name, email, password });

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Update Profile
          </Button>
        </form>
      </Container>
    </>
  );
}
