import React, { useState } from "react";
import { useParams ,useNavigate} from "react-router-dom"; 

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ResetPassword() {
  const [formData, setFormData] = useState({ password: '', cpassword: '' });
  const [error, setError] = useState('');
  const { token } = useParams(); 
  const navigate = useNavigate();


  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleResetPassword = async () => {
    try {
      const data = {
        new_password: formData.password,
        confirm_password: formData.cpassword,
      };
  
      const response = await axios.post(`http://127.0.0.1:8000/bankapp/reset-password/${token}/`, data);
      toast.success(response.data.message)
      setTimeout(()=>{
        navigate("/")
      },6000);
     
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
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleInput} className="form-control" placeholder="Enter your password" />
      </div>
      <div className={`form-group mb-3 ${error ? 'has-error' : ''}`}>
        <label htmlFor="cpassword">Confirm Password:</label>
        <input type="password" name="cpassword" id="cpassword" value={formData.cpassword} onChange={handleInput} className="form-control" placeholder="Enter confirm password" />
      </div>
      <div className="text-center">
        <button type="button" id="resetPassword" data-testid="resetPassword" name="resetPassword" className="btn btn-primary" onClick={handleResetPassword}>Submit</button>
      </div>
    </div>
    </div>
  
  );
}

export default ResetPassword;
