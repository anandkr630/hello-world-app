import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold underline"
      : "text-gray-700";

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">
          My App
        </Link>

        <nav>
          <ul className="flex gap-6 text-sm">
            <li>
              <Link
                to="/register"
                className={`hover:text-blue-600 ${isActive("/register")}`}
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`hover:text-blue-600 ${isActive("/login")}`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/verify-email"
                className={`hover:text-blue-600 ${isActive("/verify-email")}`}
              >
                Verify Email
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`hover:text-blue-600 ${isActive("/profile")}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/edit-profile"
                className={`hover:text-blue-600 ${isActive("/edit-profile")}`}
              >
                Edit Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
