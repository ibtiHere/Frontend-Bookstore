import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/forgetpassword",
        { email }
      );

      if (response.status === 200) {
        toast.success("Password reset link sent to your email");
        // Delay redirection to allow toast to display
        setTimeout(() => {
          window.location.href = "/verify-otp";
        }, 1500); // Adjust the delay time as needed
      }
    } catch (error) {
      console.error("Error in sending OTP:", error);
      toast.error("Failed to send password reset link");
    } finally {
      setLoading(false);
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
          Forget Password
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
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleForgetPassword}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default ForgetPasswordPage;
