import React from "react";
import { useUser } from "../context/UserContext";

const Register: React.FC = () => {
  const { name } = useUser();
  return <div>Register Page - Welcome, {name}!</div>;
};

export default Register;
