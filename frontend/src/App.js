// React
import React, {useState, useEffect, useRef, useContext} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
// Imports
import './App.css';
// Pages
import Home from "./pages/Home"
// Components
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  )
}