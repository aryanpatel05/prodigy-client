// src/pages/EmployeeList/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assests/styles/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddNew = () => {
    navigate('/employees/new');
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);
    setEditedEmployee({ ...employee });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/employees/${editingEmployee}`, editedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === editingEmployee ? editedEmployee : emp))
      );
      setEditingEmployee(null);
      setEditedEmployee({});
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error('Error removing employee:', error);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee Listing</h2>
      <button className="add-new-button" onClick={handleAddNew}>Add New (+)</button>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              {editingEmployee === employee.id ? (
                <>
                  <td>{employee.id}</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editedEmployee.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editedEmployee.email}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      value={editedEmployee.phone}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button className="save-button" onClick={handleEditSubmit}>Save</button>
                    <button className="cancel-button" onClick={() => setEditingEmployee(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(employee)}>Edit</button>
                    <button className="remove-button" onClick={() => handleRemove(employee.id)}>Remove</button>
                    <button className="details-button">Details</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
