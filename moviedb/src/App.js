import React, { useState } from 'react';
import Homepage from './components/Homepage';
import MovieCard from './components/MovieCrad';
function App() {
  const [content, setContent] = useState(false);
  const [movie, setMovie] = useState({});

  return (
    content ? <MovieCard movie={movie} setContent={setContent} /> : <Homepage setMovie={setMovie} setContent={setContent} movie={movie} />
  );
}

export default App;
