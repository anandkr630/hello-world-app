import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ProfileView from "./pages/ProfileView";
import EditProfile from "./pages/EditProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/verify-email";

  return (
    <UserProvider>
      {!hideHeaderFooter && <Header />}

      <main className="min-h-screen overflow-y-auto pt-16 pb-20">
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Profile routes */}
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* Optional: redirect legacy route */}
          <Route
            path="/profile-view"
            element={<Navigate to="/profile" replace />}
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}
    </UserProvider>
  );
};

export default App;
