import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Login from '../componets/Login';
import Register from '../componets/Register';
import Home from '../componets/home';
import CreatePost from '../componets/CreatePost';
import Profile from '../componets/Profile';




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/create-post" element={<CreatePost/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  );
}

export default App;
