import { React, useState } from 'react';
import './App.css';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';
import Delete from './delete.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './home.jsx';
// import Register from './registration.jsx';

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const handleLoginClick = () => {
    setShowButtons(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    setShowButtons(false);
    navigate('/register');
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setShowButtons(true);
    navigate('/');
  };

  return (
    <div>
      {showButtons && (
        <>
          <button onClick={handleLoginClick} id="login1">Login</button><br />
          <button onClick={handleRegisterClick} id="register">Register</button>
        </>
      )}
      {!showButtons && isLoggedIn && (
        <button onClick={handleLogoutClick} id="logout">Logout</button>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/delete" element={<Delete />} />

      </Routes>
    </div>
  );
};

export default App;