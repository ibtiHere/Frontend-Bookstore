import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("User successfully logged in!");
        window.location.href = "/home";
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 4,
          boxShadow:
            "inset 2px 2px 5px rgba(0,0,0,0.1), inset -2px -2px 5px rgba(255,255,255,0.7)",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          width: "100%",
          mt: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ width: "100%", marginTop: "8px" }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link href="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
