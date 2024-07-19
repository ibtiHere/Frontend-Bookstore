import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = localStorage.getItem("emailForOTP");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/verifyotp",
        { email, otp }
      );
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        setTimeout(() => {
          window.location.href = "/reset-password";
        }, 1500);
      }
    } catch (error) {
      console.error("Error in verifying OTP:", error);
      toast.error("Error in verifying OTP");
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
          Verify OTP
        </Typography>
        <form style={{ width: "100%", marginTop: "8px" }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="otp"
            label="OTP"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleVerifyOTP}
            sx={{ mt: 3, mb: 2 }}
          >
            Verify OTP
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default VerifyOtpPage;
