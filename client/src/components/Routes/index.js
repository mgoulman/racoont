import React from 'react';

import {Route, Routes} from "react-router-dom";
import Home from '../../pages/Home';

import Profile from '../../pages/Profile';
import Trending from '../../pages/Trending';

const index = () => {
  return (
   <Routes>
       <Route path="/" exact element={<Home/>} />
       <Route path="/profile"  element={<Profile/>} />
       <Route path="/trending"  element={<Trending/>} />
   </Routes>
  )
}

export default index 