import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import CryptoJS from "crypto-js";

const Register: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/;

    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Enter full name (first and last) with alphabets only.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8-15 chars, include upper, lower, number, and special char.";
    }

    if (!formData.role) {
      newErrors.role = "Select your role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      "secret-key"
    ).toString();

    // Save in context
    setUser((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      password: encryptedPassword,
      role: formData.role as "Guru" | "Shishya",
      isRegistered: true,
      isEmailVerified: false,
    }));

    // Navigate to verify email
    navigate("/verify-email");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full border p-2 rounded"
          />
          <p className="text-sm text-gray-500">
            First and last name (alphabets only)
          </p>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className="w-full border p-2 rounded"
          />
          <p className="text-sm text-gray-500">Enter a valid email address</p>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <p className="text-sm text-gray-500">
            8-15 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
          </p>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Role --</option>
            <option value="Guru">Guru</option>
            <option value="Shishya">Shishya</option>
          </select>
          <p className="text-sm text-gray-500">Choose your role</p>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
