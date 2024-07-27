import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    marginTop: "10px",
    borderRadius: "8px",
    minWidth: "150px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
});

const StyledMenuItem = styled(MenuItem)({
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const response = window.confirm("Are you sure you want to log out?");
    if (response) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleAddBook = () => {
    handleClose();
    navigate("/add-book");
  };

  const handleEditProfile = () => {
    handleClose();
    navigate("/edit-profile");
  };

  const handleMyBooks = () => {
    handleClose();
    navigate("/my-books");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            BookStore
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="cart"
              aria-controls="menu-cart"
              aria-haspopup="true"
              onClick={handleCart}
              color="inherit"
              sx={{ mr: 2 }}
            >
              <ShoppingCart />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem onClick={handleEditProfile}>
                Edit Profile
              </StyledMenuItem>
              <StyledMenuItem onClick={handleMyBooks}>My Books</StyledMenuItem>
              <StyledMenuItem onClick={handleAddBook}>Add Book</StyledMenuItem>
              <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
