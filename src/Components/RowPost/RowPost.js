import React, {useState, useEffect} from 'react'
import './RowPost.css'
import axios from '../../axios';
import { imageUrl } from '../../constants/constants';

// install react youtube using npm i react-youtube

function RowPost(props) {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovies(response.data.results)
    })
  }, [])
  
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movies.map((obj)=>
          //if only got one item inside> the item will auto return 
          <img className={props.isSmall ? 'smallPoster' :'poster' } src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
          )}
            
        </div>
    </div>
  )
}

export default RowPost
