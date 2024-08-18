import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import '../../assests/styles/Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate('/employees');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>
        <form onSubmit={handleLogin}>
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <Button type="submit" text="LOGIN" />
        </form>
        <div className="login-links">
          <span className="forgot-password">Forgot Password?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
