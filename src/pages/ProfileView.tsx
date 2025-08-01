import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProfileView: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/login");
    }
  }, [user.isLoggedIn, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Profile View</h1>
        <Link to="/edit-profile">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Profile
          </button>
        </Link>
      </div>

      {/* Profile Section */}
      <section className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">User Info</h2>
        <p>
          <span className="font-medium">Name:</span> {user.name || "—"}
        </p>
        <p>
          <span className="font-medium">Bio:</span> {user.bio || "—"}
        </p>
        <p className="mt-2">
          <span className="font-medium">Skills:</span>{" "}
          {user.skills?.length ? user.skills.join(", ") : "—"}
        </p>
        <p className="mt-2">
          <span className="font-medium">Links:</span>{" "}
          {user.links?.linkedin ? (
            <a
              href={user.links.linkedin}
              className="text-blue-500 underline mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          ) : (
            "—"
          )}
          {user.links?.github ? (
            <a
              href={user.links.github}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          ) : null}
        </p>
      </section>

      {/* Mentorship Section */}
      <section className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Mentorship Relations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">As Guru of</h3>
            {user.mentorship?.shishyas?.length ? (
              <ul className="list-disc list-inside text-gray-700">
                {user.mentorship.shishyas.map((shishya, index) => (
                  <li key={index}>{shishya}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No shishyas listed.</p>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">As Shishya of</h3>
            {user.mentorship?.gurus?.length ? (
              <ul className="list-disc list-inside text-gray-700">
                {user.mentorship.gurus.map((guru, index) => (
                  <li key={index}>{guru}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No gurus listed.</p>
            )}
          </div>
        </div>
      </section>

      {/* Payment Summary */}
      <section className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>
        <p>
          <span className="font-medium">Amount Paid:</span>{" "}
          {user.payments?.paid || "—"}
        </p>
        <p>
          <span className="font-medium">Amount Received:</span>{" "}
          {user.payments?.received || "—"}
        </p>
        <p>
          <span className="font-medium">Last Payment Date:</span>{" "}
          {user.payments?.lastPaymentDate || "—"}
        </p>
      </section>
    </div>
  );
};

export default ProfileView;
