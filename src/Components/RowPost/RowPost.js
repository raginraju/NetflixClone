import React, {useState, useEffect} from 'react'
// install react youtube using npm i react-youtube
import Youtube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios';
import { imageUrl } from '../../constants/constants';
const api_key = process.env.REACT_APP_API_KEY
function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [youtubeId, setyoutubeId] = useState('')
  useEffect(() => {
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovies(response.data.results)
    })
  }, [props.url])
  
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const trailerHandler = (movieId) =>{
    console.log(" movie id" + movieId)
    axios.get(`/movie/${movieId}/videos?api_key=${api_key}&language=en-US`).then(response=>{
        if(response.data.results.length!==0){
          console.log(response.data.results[0]);
          setyoutubeId(response.data.results[0])
        }else{
          console.log("Youtube video not found");
        }
    }).catch(err=>{
      console.log("Movie Id not found");
    })
    
  }

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movies.map((obj)=>
          //if only got one item inside> the item will auto return 
          <img onClick={()=>trailerHandler(obj.id)} key ={obj.id} className={props.isSmall ? 'smallPoster' :'poster' } src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
          )}
            
        </div>
        {youtubeId && <Youtube videoId={youtubeId.key} opts={opts}/>}
    </div>
  )
}

export default RowPost
