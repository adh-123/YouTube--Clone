import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";

import { IoMdMenu } from "react-icons/io";
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import profile_icon from '../../assets/chi.jpg'

const Navbar = ({ setSidebar }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [sidebar,setSidebar]=useState(true)

  const navigate = useNavigate();
  const popupRef = useRef(); 


  useEffect(() => {
  
      const loginStatus = localStorage.getItem("isLoggedIn");
      const name = localStorage.getItem("username");
      const mail = localStorage.getItem("email");
      if (loginStatus === "true") {
        setIsLoggedIn(true);
        setUsername(name || "");
        setEmail(mail || "");
      } else {
        setIsLoggedIn(false);
      }
    
  }, []);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate("/signin");
  };

  return (
   <nav className='nav flex-div'>

  <div className="nav-left">
    <IoMdMenu size={22}
      className='menu-icon'
      
      onClick={() =>{
       

       setSidebar(prev => !prev)}}/>

    <Link to='/'>
      <img className='logo' src={logo} alt="" />
    </Link>
  </div>
{/* 
  <div className="nav-middle flex-div">
    <div className="search-box flex-div">
      <input type='text' placeholder='search' />
      <img src={search_icon} alt="" />
    </div>
  </div> */}

  <div className="nav-right flex-div">
    {/* keep your existing login/profile code */}

      </div>

      <div className="nav-right flex-div">

        {isLoggedIn ? (
          <div className="profile-box">

            
            <img
              src={profile_icon}
              alt="user"
              className="profile-icon"
              onClick={(e) => {
                e.stopPropagation(); 
                setShowMenu(prev => !prev);
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
                    <p className="username">{username}</p>
                    <p className="email">{email}</p>
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
            onClick={() => navigate('/signin')}
          >
            <span className="icon-circle">
              <FaRegUserCircle />
            </span>
            <span>Sign in</span>
          </button>

        )}

      </div>
    </nav>
  )
}

export default Navbar;