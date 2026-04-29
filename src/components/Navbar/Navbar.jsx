import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

import logo from "../../assets/logo.png";
import profile_icon from "../../assets/chi.jpg";

const Navbar = ({ setSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const popupRef = useRef();

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setUser(null);
    setShowMenu(false);

    navigate("/signin");
  };

  return (
    <nav className="nav flex-div">
      {/* LEFT */}
      <div className="nav-left">
        <IoMdMenu
          size={22}
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
        />

        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right flex-div">
        {isLoggedIn ? (
          <div className="profile-box">
            <img
              src={profile_icon}
              alt="user"
              className="profile-icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
            />

            {showMenu && (
              <div
                className="profile-popup"
                ref={popupRef}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="profile-info">
                  <img src={profile_icon} alt="user" />

                  <div>
                    <p className="username">
                      {user?.username || "Guest"}
                    </p>
                    <p className="email">
                      {user?.email || ""}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="signout" onClick={handleLogout}>
                  <p>Sign out</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="yt-signin-btn"
            onClick={() => navigate("/signin")}
          >
            <span className="icon-circle">
              <FaRegUserCircle />
            </span>
            <span>Sign in</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;