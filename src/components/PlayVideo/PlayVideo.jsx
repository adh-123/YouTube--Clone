import React, { useState, useEffect } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../Data'
import moment from 'moment'
import { TbRuler2 } from 'react-icons/tb'

const PlayVideo = ({ videoId }) => {

  const [apiData, setApiData] = useState(null)
  const [channelData, setChannelData] = useState(null)
  const [commentData, setCommentData] = useState([])
  const [loading, setLoading]=useState(TbRuler2)
  const fetchVideoData = async () => {
    setLoading(true);
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`

    const res = await fetch(url)
    const data = await res.json()
    setApiData(data.items[0])
    setLoading(false)
  }
  const fetchChannelData = async () => {
    if (!apiData) return

    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`

    const res = await fetch(url)
    const data = await res.json()
    setChannelData(data.items[0])
  }
  const fetchCommentData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`

    const res = await fetch(url)
    const data = await res.json()
    setCommentData(data.items)
  }


  // Hooks
  useEffect(() => {
    fetchVideoData()
    fetchCommentData()
  }, [videoId])

  useEffect(() => {
    fetchChannelData()
  }, [apiData])
  useEffect(()=>{
    setLoading(true)
    fetchVideoData()
    fetchCommentData()
  },[videoId])

  return (
<div className="play-video">
  <div className={`video-wrapper ${loading ? "skeleton" : ""}`}>
  {loading ? (

  <div className="playvideo-skeleton">

    <div className="video-box"></div>

    <div className="title"></div>

    <div className="channel-row">
      <div className="avatar"></div>
      <div className="channel-text">
        <div className="line"></div>
        <div className="line small"></div>
      </div>
    </div>

  </div>

) : (

<>

  <iframe
    width="100%"
    height="500"
    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="video-player"
    onLoad={()=> setLoading(false)}
  ></iframe>
    <h3>{apiData?.snippet?.title}</h3>

 </>)}
    
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "0"} Views &bull;
          {apiData && moment(apiData.snippet.publishedAt).fromNow()}
        </p>

        <div>
          <span>
            <img src={like} alt="" />
           {apiData ? value_converter(apiData.statistics.likeCount) : 0}
          </span>

          <span>
            <img src={dislike} alt="" />0
          </span>

          <span>
            <img src={share} alt="" />Share
          </span>

          <span>
            <img src={save} alt="" />Save
          </span>
        </div>
      </div>

      <hr />

    
      <div className="publisher">
        <img
          src={channelData?.snippet?.thumbnails?.default?.url}
          alt=""
        />

        <div>
          <p>{apiData?.snippet?.channelTitle}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "0"} Subscribers
          </span>
        </div>

        <button>Subscribe</button>
      </div>


      <div className="video-description">
        <p>{apiData?.snippet?.description?.slice(0,230)}</p>

        <hr />

        <h4>
          {apiData?.statistics?.commentCount || 0} Comments
        </h4>

        
        {commentData?.map((item, index) => (
          <div key={index} className="comment">

            <img
              src={
                item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
              }
              alt=""
            />

            <div>
              <h3>
                {
                  item?.snippet?.topLevelComment?.snippet
                    ?.authorDisplayName
                }
              </h3>

              <span>
                {moment(
                  item?.snippet?.topLevelComment?.snippet?.publishedAt
                ).fromNow()}
              </span>

              <p>
                {
                  item?.snippet?.topLevelComment?.snippet?.textDisplay
                }
              </p>

              <div className="comment-action">
                <span>
                {
                    item?.snippet?.topLevelComment?.snippet?.likeCount || 0
                  }
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  </div>
  )
}

export default PlayVideo