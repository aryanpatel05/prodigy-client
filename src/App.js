import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import EmployeeCreate from './pages/EmployeeCreate/EmployeeCreate';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EmployeeCreate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
