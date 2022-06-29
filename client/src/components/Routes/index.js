import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Trending from '../../pages/Trending';

const index = () => {
    console.log("heere");
  return (
    <div>
        <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/profile"  element={<Profile />} />
            <Route path="/trending"  element={<Trending />} />
        </Routes>
    </div>
  )
}

export default index