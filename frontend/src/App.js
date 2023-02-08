// React
import React, {useState, useEffect, useRef, useContext} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
// Imports
import './App.css';
// Pages
import Home from "./pages/Home"
import Login from './pages/Login';
import Signup from './pages/Signup';
// Components
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}