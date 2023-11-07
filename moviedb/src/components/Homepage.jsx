import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css'
import Swal from 'sweetalert2';
import {FallingLines} from 'react-loader-spinner'

const Homepage = ({ setMovie, setContent, movie }) => {
    const [state, setState] = useState([]);
    const [search, setSearch] = useState('');
    const[searchWord, setSearchWord] = useState(false);
    const [loading , setLoading] = useState(false);
    const[showLoaderContent,setShowLoaderContent] = useState("Loading...")

    const handleChange = (e) => {
        setSearchWord(true);
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        let timerId;
        let timerId2;
        
        try {
            const response = await axios.get(`https://moviesdb-ux9t.onrender.com/search?query=${search}`);
            if (search === '' && response.data.results.length === 0) {
                Swal.fire('Please enter a movie name');
                setLoading(true);
                timerId = setTimeout(() => {
                    setLoading(false);
                }, 2500);
            } else if (searchWord && response.data.results.length === 0) {
                Swal.fire('Movie Not Found');
                setLoading(true);
                timerId2 = setTimeout(() => {
                    setLoading(false);
                }, 2500);
            } else {
                setState(response.data.results);
            }
            console.log("RESPONSE FROM API: ", state);
        } catch (error) {
            console.error('Error searching for movies:', error);
        } finally {
            if (timerId) clearTimeout(timerId);
            if (timerId2) clearTimeout(timerId2);
        }
    };
    

    const displayDetails = (ele) => {
        setMovie(ele);
        setContent(true);
    };

    useEffect(() => {
        let timerId;
            let timerId2
        const fetchData = async () => {
           
             timerId = setTimeout(()=>{
                setShowLoaderContent('Its taking longer than usual..')
            },5000)
             timerId2 = setTimeout(()=>{
                setShowLoaderContent('We are trying to establish connection..please wait')
            },8000)
            const movies = await axios.get('https://moviesdb-ux9t.onrender.com/');
            console.log("HP",movies)
            setState(movies.data.results);
            setLoading(false);
            clearTimeout(timerId);
            clearTimeout(timerId2)
            console.log("HP",state)
        };
        setLoading(true);
        fetchData();
        return () => {
            clearTimeout(timerId);
            clearTimeout(timerId2);
        };
        
    }, []);

    return (
        loading?<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <div style={{marginTop:'15rem'}}> <FallingLines
            color="#4fa94d"
            width={100}
            visible={true}
            ariaLabel="falling-lines-loading"
            
        /></div>
        <div style={{ fontSize: '16px', color: '#777', marginTop: '10px',fontFamily: 'Arial,sans-serif'}}>
            {showLoaderContent}
        </div>
    </div>:
        <div className='homepage-container'>
            <div className='search-container'>
                <input type="search" placeholder="Search for a movie..." onChange={handleChange} />
                <button className='button-home' onClick={handleSearch}>Search</button>
            </div>
            <div className='movie-grid'>
                {state.map((ele, index) => (
                    <div className='movie-card' onClick={() => displayDetails(ele)} key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`} alt={movie.title} />
                        <h2 style={{ textAlign: 'center', fontSize: '18px', fontFamily: 'TimesNewRoman', color: '#333',fontWeight: 'lighter'  }}>{ele.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
