import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import  Video from './pages/Video/Video'
import Signin from "./pages/Registeration/Signin";
import Signup from "./pages/Registeration/Signup";

const App = () => {
  const [sidebar ,setSidebar]=useState(true);
  const [isLoggedIn,setIsLoggedIn]=useState(true);
  return (
    <div>
   <Navbar setSidebar={setSidebar}/>
    {/* <Home sidebar={sidebar} setSidebar={setSidebar} />  */}
   <Routes>
    <Route path="/signin" element={<Signin />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />}/>
    <Route path='/' element={<Home sidebar={sidebar}/>}/>
    <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
   </Routes>
   </div>

  )

}
export default App

