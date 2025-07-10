import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <header>
    <nav>
      <Link to="/hello">Hello</Link> |<Link to="/register">Register</Link> |
      <Link to="/login">Login</Link> |
      <Link to="/verify-email">Verify Email</Link> |
      <Link to="/profile-view">Profile</Link> |
      <Link to="/edit-profile">Edit Profile</Link>
    </nav>
  </header>
);

export default Header;
