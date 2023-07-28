"use client"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from '../app/pages/index';
import NavBar from './components/NavBar';
import FavouritesPage from './pages/favourites';

export default function Home() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<IndexPage/>} />
          <Route path="/fav" element={<FavouritesPage />} />
      </Routes>
      </div>
    </Router>
  )
}