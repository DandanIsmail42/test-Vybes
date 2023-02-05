import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddEmployee = () => {
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const [salary, setSalary] = useState();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState('')

  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/employee", {
        name: name,
        address: address,
        salary: salary,
        email: email
      });
      navigate("/employee");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Add New Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">address</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                    placeholder="address"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Salary</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="salary"
                  />
                </div>
              </div>
                 
              <div className="field">
                <label className="label">email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="address"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                 
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddEmployee;