import React, { useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

import Home from './pages/Home/Home';
import Video from './pages/Video/Video';
import Signin from "./pages/Registeration/Signin";
import Signup from "./pages/Registeration/Signup";

const App = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [category, setCategory] = useState(0);

  const location = useLocation();

  // 👉 Detect pages
  const isVideoPage = location.pathname.includes("/video");

  const isAuthPage =
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  return (
    <div>

      {/* ✅ Hide Navbar on Signin/Signup */}
      {!isAuthPage && (
        <Navbar setSidebar={setSidebar} />
      )}

      {/* ✅ Hide Sidebar on Signin/Signup + Video */}
      {!isAuthPage && !isVideoPage && (
        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
          category={category}
          setCategory={setCategory}
        />
      )}

      {/* ✅ Routes */}
      <Routes>

        {/* Auth Pages */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Home */}
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Home sidebar={sidebar} category={category} />
              : <Navigate to="/signin" />
          }
        />

        {/* Video Page */}
        <Route
          path="/video/:categoryId/:videoId"
          element={<Video />}
        />

      </Routes>

    </div>
  );
};

export default App;