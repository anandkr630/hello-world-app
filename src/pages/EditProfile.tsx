import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfile: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: "",
    linkedin: "",
    github: "",
    gurus: "",
    shishyas: "",
    paid: "",
    received: "",
    lastPaymentDate: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData({
      name: user.name || "",
      bio: user.bio || "",
      skills: user.skills?.join(", ") || "",
      linkedin: user.links?.linkedin || "",
      github: user.links?.github || "",
      gurus: user.mentorship?.gurus?.join(", ") || "",
      shishyas: user.mentorship?.shishyas?.join(", ") || "",
      paid: user.payments?.paid || "",
      received: user.payments?.received || "",
      lastPaymentDate: user.payments?.lastPaymentDate || "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(formData.name)) {
      setError("Please enter full name (first and last name).");
      return;
    }

    if (!formData.bio || !formData.skills) {
      setError("Bio and skills are required.");
      return;
    }

    const updatedSkills = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const updatedGurus = formData.gurus
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    const updatedShishyas = formData.shishyas
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setUser((prev) => ({
      ...prev,
      name: formData.name,
      bio: formData.bio,
      skills: updatedSkills,
      links: {
        linkedin: formData.linkedin,
        github: formData.github,
      },
      mentorship: {
        gurus: updatedGurus,
        shishyas: updatedShishyas,
      },
      payments: {
        paid: formData.paid,
        received: formData.received,
        lastPaymentDate: formData.lastPaymentDate,
      },
    }));

    setSuccess("Profile updated successfully!");
    setTimeout(() => navigate("/profile"), 1500);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

        {/* Basic Info */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <textarea
          name="bio"
          placeholder="Short bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        {/* Social Links */}
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="url"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        {/* Mentorship */}
        <input
          type="text"
          name="gurus"
          placeholder="Mentors (comma separated)"
          value={formData.gurus}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="text"
          name="shishyas"
          placeholder="Mentees (comma separated)"
          value={formData.shishyas}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        {/* Payment Info */}
        <input
          type="text"
          name="paid"
          placeholder="Paid (e.g., ₹500)"
          value={formData.paid}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="text"
          name="received"
          placeholder="Received (e.g., ₹800)"
          value={formData.received}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="date"
          name="lastPaymentDate"
          value={formData.lastPaymentDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
