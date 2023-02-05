import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
   getEmployee();
  }, []);

  const getEmployee = async () => {
    const response = await axios.get("http://localhost:5000/employee");
    setEmployee(response.data);
  };

  const deleteEmployee = async (employeeId) => {
    await axios.delete(`http://localhost:5000/employee/${employeeId}`);
   getEmployee();
  };

  return (
    <div>
      <h1 className="title">Employee</h1>
      <h2 className="subtitle">List of Employee</h2>
      <Link to="/employee/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Email</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp, index) => (
            <tr key={emp.uuid}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.address}</td>
              <td>{emp.salary}.000.000</td>
              <td>{emp.email}</td>
              <td>{emp.user.name}</td>
              <td>
                <Link
                  to={`/employee/edit/${emp.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEmployee(emp.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;