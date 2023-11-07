import React from 'react';
import './ThemeToggler.css'; 

function ThemeToggler({ theme, toggleTheme }) {
  return (
    <button className={`theme-toggler ${theme}`} onClick={toggleTheme}>
      {theme === 'light' ? 'Theme🌙 ' : 'Theme☀️'}
    </button>
  );
}

export default ThemeToggler;
