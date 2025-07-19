import React from "react";
import { Routes, Route } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ProfileView from "./pages/ProfileView";
import EditProfile from "./pages/EditProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/hello" element={<HelloWorld />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/profile-view" element={<ProfileView />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
