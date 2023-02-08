// React
import React, {useState, useEffect, useRef, useContext} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Navigate} from "react-router-dom"
import { useAuthContext } from './context/AuthContext';
// Imports
import './App.css';
// Pages
import Home from "./pages/Home"
import Login from './pages/Login';
import Signup from './pages/Signup';
// Components
import Navbar from './components/Navbar';

export default function App() {
  const {user} = useAuthContext()

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          user ? <Home/> : <Navigate to="/login"/>
        }/>
        <Route path="/login" element={
          !user ? <Login/> : <Navigate to="/"/>
        }/>
        <Route path="/signup" element={
          !user ? <Signup/> : <Navigate to="/"/>
        }/>
      </Routes>
    </>
  )
}