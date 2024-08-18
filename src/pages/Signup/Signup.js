import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import '../../assests/styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      console.log('Submitting:', { name, email, password });
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        name,
        email,
        password
      });
      console.log('Response:', response);
      alert('User registered successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">REGISTRATION</h2>
        <form onSubmit={handleSubmit}>
          <FormInput type="text" name="name" placeholder="Username" onChange={handleChange} value={formData.name} />
          <FormInput type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          <FormInput type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
          <FormInput type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} />
          <Button type="submit" text="SIGN UP" />
        </form>
        <div className="login-link">
          <span className="account-text">Already have an account?</span>&nbsp;
          <span className="login-clickable" onClick={handleLoginClick}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
