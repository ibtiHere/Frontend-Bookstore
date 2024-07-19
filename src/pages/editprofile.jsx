import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Navbar from "../components/NavBar";
// import { fetchUserProfile } from "../services/profileService";
// import { updateUserProfile } from "../services/profileService"; // Assume this exists

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setName(data.name);
        setEmail(data.email);
        setBio(data.bio);
        setProfileImage(data.profileImage);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    getUserProfile();
  }, []);

  const handleImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserProfile({ name, email, bio, profileImage });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              src={profileImage || "https://via.placeholder.com/150"}
              sx={{ width: 100, height: 100, marginRight: 2 }}
            />
            <input
              accept="image/*"
              type="file"
              id="profile-image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="profile-image">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default EditProfile;
