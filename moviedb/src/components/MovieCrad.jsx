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
                    <h4>Popularity: {movie.popularity}</h4>
                    <h4>Vote Count: {movie.vote_count}</h4>
                    <h3>Year: {movie.release_date}</h3>
                    <button onClick={goBack}>Go Back</button>
                </div>
            )}
        </div>
    );
}

export default MovieCard;
