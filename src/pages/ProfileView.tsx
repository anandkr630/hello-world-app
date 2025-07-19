import React from "react";
import { useUser } from "../context/UserContext";

const ProfileView: React.FC = () => {
  const { name } = useUser();
  return <h1>Login Page — Welcome, {name}!</h1>;
};

export default ProfileView;
