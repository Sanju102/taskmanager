import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Tasks from './components/Tasks';
import Contact from './components/Contact';
import Login from './components/Login';

function App() {
  const backendHost = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <>
            <Navbar 
              isAuthenticated={isAuthenticated} 
              setIsAuthenticated={setIsAuthenticated}
              setToken={setToken} 
              token={token}
              backendHost={backendHost}
              username={username}
              setUsername={setUsername}
            />
            <Routes>
              <Route path="/" element={<Home token={token} backendHost={backendHost} username={username} />} />
              <Route path="/about" element={<About />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route 
              path="/login" 
              element={
                <Login 
                  setIsAuthenticated={setIsAuthenticated} 
                  setToken={setToken}
                  backendHost={backendHost}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
