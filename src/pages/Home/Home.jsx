import React from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css'
import Feed from '../../components/Feed/Feed';
import { useState } from 'react';

const Home = ({sidebar}) => {
  const [category,setcategory]=useState(0);
  return (
    <>
     < Sidebar  sidebar={sidebar} category={category} setCategory={setcategory}/>
     <div className={`container ${sidebar?"":'large-container'}`}>
      <Feed sidebar={sidebar} category={category} />
     
     </div>


    </>
  )
}

export default Home