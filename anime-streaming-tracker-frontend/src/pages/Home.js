import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch('/anime')  // This will hit the Flask API
      .then(response => response.json())
      .then(data => setAnimes(data));
  }, []);

  return (
    <div>
      <h1>Anime List</h1>
      <ul>
        {animes.map((anime, index) => (
          <li key={index}>
            <Link to={`/anime/${anime.id}`}>{anime.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
