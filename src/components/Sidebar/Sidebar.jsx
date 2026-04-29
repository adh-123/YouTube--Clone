import React from 'react'
import './Sidebar.css'

import { LiaHomeSolid } from "react-icons/lia"
import { IoGameControllerOutline } from "react-icons/io5"
import { SiDsautomobiles } from "react-icons/si"
import { MdOutlineSportsBaseball } from "react-icons/md"
import { SiDcentertainment } from "react-icons/si"
import { GrTechnology } from "react-icons/gr"
import { PiMusicNotesSimpleLight } from "react-icons/pi"
import { TbLogs } from "react-icons/tb"
import { PiNewspaperClippingLight } from "react-icons/pi"

const Sidebar = ({ sidebar, category, setCategory, setSidebar }) => {

  //  Detect mobile
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      
      {sidebar && isMobile && (
        <div 
          className="overlay" 
          onClick={() => setSidebar(false)}
        ></div>
      )}

      {/* ===== Sidebar ===== */}
      <div className={`sidebar ${sidebar ? "active" : ""}`}>

        <div className="sortcut-links">

          <div 
            className={`side-link ${category===0?"active":""}`} 
            onClick={()=>setCategory(0)}
          >
            <LiaHomeSolid size={22}/>
            <p>Home</p>
          </div>

          <div 
            className={`side-link ${category===20?"active":""}`} 
            onClick={()=>setCategory(20)}
          >
            <IoGameControllerOutline size={22}/>
            <p>Gaming</p>
          </div>

          <div 
            className={`side-link ${category===2?"active":""}`} 
            onClick={()=>setCategory(2)}
          >
            <SiDsautomobiles size={22}/>
            <p>Automobiles</p>
          </div>

          <div 
            className={`side-link ${category===17?"active":""}`} 
            onClick={()=>setCategory(17)}
          >
            <MdOutlineSportsBaseball size={22}/>
            <p>Sports</p>
          </div>

          <div 
            className={`side-link ${category===24?"active":""}`} 
            onClick={()=>setCategory(24)}
          >
            <SiDcentertainment size={22}/>
            <p>Entertainment</p>
          </div>

          <div 
            className={`side-link ${category===28?"active":""}`} 
            onClick={()=>setCategory(28)}
          >
            <GrTechnology size={22}/>
            <p>Technology</p>
          </div>

          <div 
            className={`side-link ${category===10?"active":""}`} 
            onClick={()=>setCategory(10)}
          >
            <PiMusicNotesSimpleLight size={22}/>
            <p>Music</p>
          </div>

          <div 
            className={`side-link ${category===22?"active":""}`} 
            onClick={()=>setCategory(22)}
          >
            <TbLogs size={22}/>
            <p>Blogs</p>
          </div>

          <div 
            className={`side-link ${category===25?"active":""}`} 
            onClick={()=>setCategory(25)}
          >
            <PiNewspaperClippingLight size={22}/>
            <p>News</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Sidebar