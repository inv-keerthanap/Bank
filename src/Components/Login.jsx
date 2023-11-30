import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { customerService } from '../urls';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const handleInput = (e) => {
  const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    try {
      const response = await customerService.loginUser(formData);
  
      console.log('Response data:', response.data);
  
      if (response.data.accessToken) {
        const { accessToken, userType, id, accountId,name } = response.data;
        localStorage.setItem('token', accessToken);
        const user = {
          id: id,
          userType: userType,
          name:name,
          accountId: accountId,
        };
      
        localStorage.setItem('user', JSON.stringify(user));
        if (
          userType === 'customer' ||
          userType === 'admin' ||
          userType === 'staff' ||
          userType === 'manager'
        ) {
          navigate('/Profile');
        }
      }
    } catch (error) {
    
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;

        if (errorMessage.includes('email does not exist')) {
          setError('Email does not exist.');
        } else if (errorMessage.includes('Incorrect password')) {
          setError('Incorrect password.');
        } else if (errorMessage.includes('User is not approved')) {
          setError("You can not login you are not approved yet!!!");
        } else {
          setError('Login failed. Please check your email and password.');
        }
      } else {
        setError('An error occurred while logging in.');
      }
    }
  };
  
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    
  return (
   
    <div className="login-page">
      <div className="left-content">
        <img src="images/bg3.jpg" alt="Image" />
      </div>
      <div className="right-content">
        <h3 className="h3">Welcome To ABC Bank</h3>
        <h3 className="h3">Login!!!!</h3>
        <div className={`form-group mb-3 ${error ? 'has-error' : ''}`}>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" id="email" value={formData.email} onChange={handleInput} className="form-control" placeholder="Enter your email id" />
        </div>
        
        <div className={`form-group mb-3 ${error ? 'has-error' : ''}`}>
  <label htmlFor="password">Password:</label>
        <div className="password-input">
          <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={formData.password} onChange={handleInput}className="form-control"placeholder="Enter your password"
          />
          <span className="eye-icon"  data-testid="toggle-password" onClick={togglePasswordVisibility}>
            <Icon icon={showPassword ? eye : eyeOff} size={25} />
          </span>
        </div>
      </div>

        <div className="text-center">
          <button type="button" id="login" data-testid="login"  name="login" className="btn btn-primary" onClick={handleSubmit}>Login</button>
        </div>
        <p className="text-center mt-3">Don't have an account?
          <Link to="/register" style={{ color: '#0d6efd' }}>Register here</Link>
        </p>
        <p className="text-center mt-3">
          <Link to="/ForgotPassword" style={{ color: '#0d6efd' }}>Forgot Password</Link>
        </p>
       
        {error && <div className="error">{error}</div>}
      
    </div>
      </div>
 
    
  );
}

export default Login;
