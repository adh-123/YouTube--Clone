import React, { useState, useEffect } from 'react'
import './Recommended.css'
import { API_KEY, value_converter } from '../../Data'
import { Link } from 'react-router-dom'

const Recommended = ({ categoryId }) => {

  const [apiData, setApiData] = useState([])
  const[loading,setLoading]=useState()

  const fetchData = async () => {
    setLoading(true);
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`

    const res = await fetch(url)
    const data = await res.json()

    setApiData(data.items || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [categoryId])

  
  
  return (
  <div className='recommended'>

    {loading
      ? Array(8).fill("").map((_, index) => (

          <div key={index} className='side-video-list skeleton-rec'>

            <div className="thumb"></div>

            <div className="vid-info">
              <div className="line title"></div>
              <div className="line channel"></div>
              <div className="line views"></div>
            </div>

          </div>

        ))

      : apiData.map((item, index) => (

          <Link
            to={`/video/${categoryId}/${item.id}`}
            key={index}
            className='side-video-list'
          >

            <img
              src={item?.snippet?.thumbnails?.medium?.url}
              alt=""
            />

            <div className="vid-info">
              <h4>{item?.snippet?.title}</h4>

              <p>{item?.snippet?.channelTitle}</p>

              <p>
                {value_converter(item?.statistics?.viewCount || 0)} Views
              </p>
            </div>

          </Link>

        ))
    }

  </div>
)}
export default Recommended