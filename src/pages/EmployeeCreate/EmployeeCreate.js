import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assests/styles/EmployeeCreate.css';

const EmployeeCreate = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    isActive: false
  });
  const [employeeId, setEmployeeId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/employees', employee);
      setEmployeeId(response.data.id); // Set the new employee ID
      navigate('/employees');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className="employee-create-container">
      <h2>Employee Create</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Is Active:
          <input
            type="checkbox"
            name="isActive"
            checked={employee.isActive}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
      {employeeId && <p>Employee created with ID: {employeeId}</p>}
    </div>
  );
}

export default EmployeeCreate;
