import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import Navbar from "../components/NavBar";
// import { fetchUserProfile } from "../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <img
                src={user.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  width: 100,
                  height: 100,
                  marginRight: 16,
                }}
              />
              <Typography variant="h4">{user.name}</Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
              Email:
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Bio:
            </Typography>
            <Typography variant="body1">{user.bio}</Typography>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                href="/edit-profile"
              >
                Edit Profile
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;
