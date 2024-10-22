// src/pages/Home.js
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
      <h1>Welcome to the Anime Streaming Tracker</h1>
      <p>
        This application allows you to track your favorite anime series. You can add new anime to the list, view details about each anime, and see reviews from other users. 
      </p>
      <p>
        Here are some things you can do:
      </p>
      <ul>
        <li><strong>Add Anime:</strong> Use the <Link to="/add-anime">Add Anime</Link> page to submit new titles to the tracker.</li>
        <li><strong>View Anime List:</strong> Navigate to the <Link to="/anime-list">Anime List</Link> page to see all the anime currently in the tracker.</li>
        <li><strong>View Anime Details:</strong> Click on any anime title in the list to see more details and reviews.</li>
      </ul>

      <h2>Currently Available Animes</h2>
      <ul>
        {animes.length > 0 ? (
          animes.map((anime) => (
            <li key={anime.id}>
              <Link to={`/anime/${anime.id}`}>{anime.title}</Link>
            </li>
          ))
        ) : (
          <p>No anime available at the moment. Please check back later!</p>
        )}
      </ul>
    </div>
  );
}

export default Home;
