
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/bankapp/forgot-password', formData);
    
      console.log(response.data);
      toast.success(response.data.message)
    } catch (error) {

      console.error(error.response.data);
      setError('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="left-content">
        <img src="images/bg3.jpg" alt="Image" />
      </div>
      <div className="right-content">
      
      <div className={`form-group mb-3 ${error ? 'has-error' : ''}`}>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" id="email" value={formData.email} onChange={handleInput} className="form-control" placeholder="Enter your email id" />
      </div>
      <div className="text-center">
        <button type="button" id="forgotPassword" data-testid="forgotPassword" name="forgotPassword" className="btn btn-primary" onClick={handleForgotPassword}>Submit</button>
      </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
