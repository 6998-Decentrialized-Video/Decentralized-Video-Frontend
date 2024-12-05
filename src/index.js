import React from "react";
import "@radix-ui/themes/styles.css";
import ReactDOM from "react-dom/client";
import Video from "./pages/video/Video.js";
import Upload from "./pages/upload/Upload.js";
import Publish from "./pages/publish/Publish";
import Home from "./pages/Home/Home";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import OAuthCallback from "./pages/login/login_callback";
import User from "./pages/user/User";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Theme>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="video" element={<Video />} />
          <Route path="video/:id" element={<Video />} />
          <Route path="login" element={<Login />} />
          <Route path="upload" element={<Upload />} />
          <Route path="publish" element={<Publish />} />
          <Route path="user" element={<User />} />
          <Route path="user/:id" element={<User />} />
          <Route path="oauth/callback" element={<OAuthCallback />} />
        </Routes>
      </Theme>
    </BrowserRouter>
  </AuthProvider>
);
