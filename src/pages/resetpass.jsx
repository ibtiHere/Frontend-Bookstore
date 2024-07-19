import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = localStorage.getItem("emailForOTP");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/resetpassword",
        { email, newPassword, confirmNewPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setTimeout(() => {
          toast.success("Password reset successful");
        }, 1500);
        // Remove email from local storage
        localStorage.removeItem("emailForOTP");
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password");
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
          Reset Password
        </Typography>
        <form style={{ width: "100%", marginTop: "8px" }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="current-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            id="confirmNewPassword"
            autoComplete="current-password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default ResetPasswordPage;
