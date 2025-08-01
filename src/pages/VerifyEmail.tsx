import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const VERIFY_CODE = "140913";

const VerifyEmail: React.FC = () => {
  const { user, setUser } = useUser();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Prevent access if not registered
  useEffect(() => {
    if (!user.isRegistered) {
      navigate("/register");
    }
  }, [user.isRegistered, navigate]);

  const handleVerify = () => {
    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    if (code === VERIFY_CODE) {
      setUser((prev) => ({ ...prev, isEmailVerified: true }));
      navigate("/login");
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Verify Email</h1>
        <p className="mb-4 text-sm text-gray-600">
          Welcome, {user.name}! Enter the 6-digit code sent to{" "}
          <strong>{user.email}</strong>.
        </p>

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full p-2 text-center border rounded-lg text-lg mb-3"
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
