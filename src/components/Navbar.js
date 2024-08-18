// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/employees">Employee List</Link>
    </nav>
  );
};

export default Navbar;
