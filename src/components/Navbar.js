import React, { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

export default function Navbar({ isAuthenticated, setIsAuthenticated, setToken, backendHost, token, username, setUsername }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchUsername = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${backendHost}/api/user/username/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.error('Failed to fetch username');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  }, [backendHost, token, setUsername]);

  useEffect(() => {
    fetchUsername();
  }, [backendHost, token, fetchUsername, setUsername]);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log('Searching for:', e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light d-block">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TaskManager
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" end>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </li>
        </ul>
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="notification-container">
          <FontAwesomeIcon icon={faBell} className="notification-icon" />
          <span className="notification-badge">30</span>
        </div>
        <div className="dropdown">
          <button 
            className="btn btn-transparent dropdown-toggle" 
            type="button" 
            id="languageDropdown" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            {username}
          </button>
          <ul className="dropdown-menu" aria-labelledby="languageDropdown">
          <li><a className="dropdown-item" href="/">
          <FontAwesomeIcon icon={faUser} />
          Profile
          </a></li>
          <li><button className="dropdown-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Log out
            </button></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}