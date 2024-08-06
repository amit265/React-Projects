import React from 'react'

const VideoCard = ({data}) => {
    const {snippet, statistics} = data;
    const {channelTitle, title, thumbnails} = snippet;
  return (
    <div className='p-2 m-2 w-64 shadow-lg rounded-lg'>
        <img className='rounded-lg' src={thumbnails.medium.url} alt="thumbnails" />
        <ul className='p-2'>
            <li className='font-bold'>{title}</li>
            <li>{channelTitle}</li>
            <li>Views: {statistics.viewCount}</li>
        </ul>
      
    </div>
  )
}

export default VideoCard
