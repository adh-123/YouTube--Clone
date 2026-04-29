import React from 'react'
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import Recommended from '../../components/Recommended/Recommended'
import './Video.css'
import { useParams } from 'react-router-dom'

const Video = ({ sidebar }) => {
  const { videoId, categoryId } = useParams();

  return (
    <div className={`play-container ${sidebar ? 'large-container' : ''}`}>
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  )
}

export default Video