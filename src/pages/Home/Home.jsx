import React from 'react'
import './Home.css'
import Feed from '../../components/Feed/Feed';

const Home = ({ sidebar, category }) => {
  return (
    <div className={`container ${sidebar ? 'large-container' : ''}`}>
      <Feed sidebar={sidebar} category={category} />
    </div>
  )
}

export default Home