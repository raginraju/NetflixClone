import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios.js'
import { imageUrl } from '../../constants/constants.js';
const API_KEY = process.env.REACT_APP_API_KEY;



function Banner() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[1])
      setMovie(response.data.results[1])     
    })
  
  }, [])
  
  return (
    <div style={{backgroundImage : `url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
     className='banner'>
      <div className='content'>
        <div className='title'>{movie ? movie.name ? movie.name : movie.title  : ""}</div>
        <div className='banner_buttons'>
            <div className='button'>Play</div>
            <div className='button'>My List</div>
        </div>
        <div className='description'>{movie ? movie.overview: ""}</div>
      </div>
      <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner
