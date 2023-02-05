import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
    const [name, setName] = useState("");
    const [address, setAdress] = useState("");
    const [salary, setSalary] = useState();
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/employee/${id}`
        );
        setName(response.data.name);
        setAdress(response.data.address);
        setSalary(response.data.salary);
        setEmail(response.data.email);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);


  const updateProduct = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/employee/${id}`, {
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

  const reset = (e) => {
    e.preventDefault()
    setName('');
    setAdress('');
    setSalary('');
    setEmail('');
  }
  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
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
                <label className="label">Address</label>
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
                <label className="label">Email</label>
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
                  <button type="submit" className="button is-success mr-2">
                    Update
                  </button>
                  <button onClick={reset} className="button is-dark">
                    Reset
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

export default FormEditProduct;