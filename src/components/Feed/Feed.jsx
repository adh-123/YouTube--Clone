import React, { useState, useEffect } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../Data'
import moment from 'moment'

const Feed = ({ category }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  

  const fetchData = async () => {
    try {
      setLoading(true)

      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`

      const res = await fetch(url)
      const result = await res.json()

      setData(result.items || [])
    } catch (error) {
      console.error("Error fetching videos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    window.scrollTo(0, 0)  
  }, [category])

  return (
  <div className="feed">

    {loading
      ? Array(8).fill("").map((_, index) => (
          <div key={index} className="card skeleton-card">

            <div className="thumbnail"></div>

            <div className="info">
              <div className="avatar"></div>

              <div className="text">
                <div className="line title"></div>
                <div className="line channel"></div>
              </div>
            </div>

          </div>
        ))

      : data.map((item) => (
          <Link key={item.id} to={`/video/${category}/${item.id}`}>

            <div className="card">
              <img src={item.snippet.thumbnails.high.url} alt="" />

              <h3>{item.snippet.title}</h3>
              <h2>{item.snippet.channelTitle}</h2>

              <p>
                {value_converter(item.statistics.viewCount)} Views •{" "}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </div>

          </Link>
        ))
    }

  </div>
);}
export default Feed