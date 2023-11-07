import React, { useState } from 'react';
import Homepage from './components/Homepage';
import MovieCard from './components/MovieCrad';
import ThemeToggler from './components/ThemeToggler';
import './App.css'

function App() {
  const [content, setContent] = useState(false);
  const [movie, setMovie] = useState({});
  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme}>
      <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
      {content ? <MovieCard theme={theme} movie={movie} setContent={setContent} /> : <Homepage theme={theme} setMovie={setMovie} setContent={setContent} movie={movie} />}
    </div>
  );
}

export default App;
