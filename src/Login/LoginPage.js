import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Import the CSS file

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('1234');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://assignment.stage.crafto.app/login', {
        username,
        otp
      });
      setToken(response.data.token);
      navigate('/quotes');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
