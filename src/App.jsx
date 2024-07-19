import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ResetPasswordPage from "./pages/resetpass";
import ForgetPasswordPage from "./pages/forgetpass";
import VerifyOtpPage from "./pages/verifyotp";
import HomePage from "./pages/dashboard";
import "./App.css";
import AddBook from "./pages/addbook";
import Profile from "./pages/profile";
import EditProfile from "./pages/editprofile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
