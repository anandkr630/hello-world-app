import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import CryptoJS from "crypto-js";

const Login: React.FC = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!user.isRegistered) {
      setError("User not registered. Please register first.");
      return;
    }

    if (!user.isEmailVerified) {
      setError("Email not verified. Please verify your email first.");
      return;
    }

    // Decrypt stored password
    let decryptedPassword = "";
    try {
      const bytes = CryptoJS.AES.decrypt(user.password, "secret-key");
      decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      setError("Failed to decrypt password.");
      return;
    }

    if (email === user.email && password === decryptedPassword) {
      setUser((prev) => ({ ...prev, isLoggedIn: true }));
      navigate("/profile");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
