import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css'
import Swal from 'sweetalert2';

const Homepage = ({ setMovie, setContent, movie }) => {
    const [state, setState] = useState([]);
    const [search, setSearch] = useState('');
    const[searchWord, setSearchWord] = useState(false);

    const handleChange = (e) => {
        setSearchWord(true);
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/search?query=${search}`);
            if(search===''&&response.data.results.length===0) {
                Swal.fire('Please enter movie name')
            }
            else if(searchWord && response.data.results.length===0) {
                Swal.fire('Movie Not Found')
            }
            setState(response.data.results);
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    };

    const displayDetails = (ele) => {
        setMovie(ele);
        setContent(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const movies = await axios.get('http://localhost:8080/');
            setState(movies.data.results);
        };
        fetchData();
    }, [search]);

    return (
        <div className='homepage-container'>
            <div className='search-container'>
                <input type="search" placeholder="Search for a movie..." onChange={handleChange} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className='movie-grid'>
                {state.map((ele, index) => (
                    <div className='movie-card' onClick={() => displayDetails(ele)} key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`} alt={movie.title} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
