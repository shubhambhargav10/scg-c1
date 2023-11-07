import React, { useEffect } from 'react';
import './Moviecard.css'
const MovieCard = ({ movie, setContent }) => {
    useEffect(() => {
        console.log("Movie Details:", movie);
    }, []);

    const goBack = () => {
        setContent(false);
    }

    return (
        <div className='container'>
            {movie && movie.poster_path && (
                <div className='image'>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width="250px" alt={movie.title} />
                </div>
            )}
            {movie && (
                <div>
                    <h2>{movie.original_title}</h2>
                    <h4 style={{marginTop:'1rem'}}>Overview: <span style={{fontWeight:'lighter'}}>{movie.overview}</span></h4>
                    <h4 style={{marginTop:'1rem'}}>Vote Count: <span style={{fontWeight:'lighter'}}>{movie.popularity}K votes</span></h4>
                    <h4 style={{marginTop:'1rem'}}>Popularity: <span style={{fontWeight:'lighter'}}>{movie.vote_count}M people likes this!</span></h4>
                    <h3 style={{marginTop:'1rem'}}>Release Date: <span style={{fontWeight:'lighter'}}>{movie.release_date}</span></h3>
                    <button className='button-card' onClick={goBack}>Go Back</button>
                </div>
            )}
        </div>
    );
}

export default MovieCard;
