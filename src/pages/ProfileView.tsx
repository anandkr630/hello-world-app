import React from "react";
import { Link } from "react-router-dom";

const ProfileView: React.FC = () => {
  // Dummy data
  const user = {
    name: "Anand Kumar",
    bio: "Passionate learner and mentor in the coding community.",
    skills: ["React", "TypeScript", "Node.js"],
    links: {
      linkedin: "https://www.linkedin.com/in/anand-kumar-482",
      github: "https://github.com/anandkumar",
    },
    mentorship: {
      gurus: ["Rishikesh Kumar", "Meena Joshi"],
      shishyas: ["Amit Verma", "Sneha Roy"],
    },
    payments: {
      paid: "₹2,000",
      received: "₹5,000",
      lastPaymentDate: "2025-07-10",
    },
  };

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
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Bio:</span> {user.bio}
        </p>
        <p className="mt-2">
          <span className="font-medium">Skills:</span> {user.skills.join(", ")}
        </p>
        <p className="mt-2">
          <span className="font-medium">Links:</span>{" "}
          <a
            href={user.links.linkedin}
            className="text-blue-500 underline mr-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={user.links.github}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </section>

      {/* Mentorship Section */}
      <section className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Mentorship Relations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">As Guru of</h3>
            <ul className="list-disc list-inside text-gray-700">
              {user.mentorship.shishyas.map((shishya, index) => (
                <li key={index}>{shishya}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">As Shishya of</h3>
            <ul className="list-disc list-inside text-gray-700">
              {user.mentorship.gurus.map((guru, index) => (
                <li key={index}>{guru}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Payment Summary */}
      <section className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>
        <p>
          <span className="font-medium">Amount Paid:</span> {user.payments.paid}
        </p>
        <p>
          <span className="font-medium">Amount Received:</span>{" "}
          {user.payments.received}
        </p>
        <p>
          <span className="font-medium">Last Payment Date:</span>{" "}
          {user.payments.lastPaymentDate}
        </p>
      </section>
    </div>
  );
};

export default ProfileView;
