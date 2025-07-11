import React, { useState } from "react";
import { useUser } from "../context/UserContext";

const EditProfile: React.FC = () => {
  const { name: initialName } = useUser();

  const [formData, setFormData] = useState({
    name: initialName || "",
    bio: "Frontend developer passionate about accessibility.",
    skills: "React, TypeScript, HTML, CSS",
    links: {
      github: "https://github.com/anandkr630",
      linkedin: "https://www.linkedin.com/in/anand-kumar-482811b7/",
    },
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "github" || name === "linkedin") {
      setFormData((prev) => ({
        ...prev,
        links: {
          ...prev.links,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // ✅ Name must contain first and last name, alphabets only
    const nameParts = formData.name.trim().split(/\s+/);
    if (
      nameParts.length < 2 ||
      !nameParts.every((part) => /^[A-Za-z]{2,}$/.test(part))
    ) {
      newErrors.name = "Please enter first and last name using alphabets only.";
    }

    // ✅ Bio
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required.";
    }

    // ✅ Skills
    if (!formData.skills.trim()) {
      newErrors.skills = "At least one skill is required.";
    }

    // ✅ Optional: validate GitHub and LinkedIn URLs
    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/\S*)?$/;

    if (
      formData.links.github &&
      !urlPattern.test(formData.links.github.trim())
    ) {
      newErrors.github = "Please enter a valid GitHub URL.";
    }

    if (
      formData.links.linkedin &&
      !urlPattern.test(formData.links.linkedin.trim())
    ) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      setSuccessMessage("✅ Profile updated successfully!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6 border"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="bio">
            Bio *
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            required
            className={`w-full px-3 py-2 border ${
              errors.bio ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.bio ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="skills">
            Skills (comma-separated) *
          </label>
          <input
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              errors.skills ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.skills ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
          )}
        </div>

        {/* Links */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="github">
            GitHub
          </label>
          <input
            id="github"
            name="github"
            value={formData.links.github}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.github ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.github ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.github && (
            <p className="text-red-500 text-sm mt-1">{errors.github}</p>
          )}

          <label
            className="block text-sm font-medium mt-4 mb-1"
            htmlFor="linkedin"
          >
            LinkedIn
          </label>
          <input
            id="linkedin"
            name="linkedin"
            value={formData.links.linkedin}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.linkedin ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.linkedin ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.linkedin && (
            <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
          )}
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

        {successMessage && (
          <p className="text-green-600 text-center">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
