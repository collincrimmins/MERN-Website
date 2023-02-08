import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { WorkoutContextsProvider } from './context/WorkoutContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <WorkoutContextsProvider>
        <App/>
      </WorkoutContextsProvider>
    </AuthContextProvider>
  </BrowserRouter>
);