import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import AnimeList from './components/AnimeList';
import AddAnimeForm from './components/AddAnimeForm';
import AnimeDetails from './pages/AnimeDetails';
function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/anime-list">Anime List</Link>
          </li>
          <li>
            <Link to="/add-anime">Add Anime</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime-list" element={<AnimeList />} />
        <Route path="/add-anime" element={<AddAnimeForm />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;