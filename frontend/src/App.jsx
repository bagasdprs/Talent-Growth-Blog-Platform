import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </>
  );
}

export default App;
