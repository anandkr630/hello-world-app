import React from "react";
import { useUser } from "../context/UserContext";

const VerifyEmail: React.FC = () => {
  const { name } = useUser();
  return <h1>Verify Email Page — Welcome, {name}!</h1>;
};

export default VerifyEmail;
