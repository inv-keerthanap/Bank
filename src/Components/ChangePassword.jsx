import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customerService } from "../urls";
import Dashboard from "./Dashboard";
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import './ChangePassword.css';
function ChangePassword() {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try{
        const response = await customerService.ChangePassword(formData);
        toast.success(response.data.message)
    }
    catch(error){
        if(error.response){
        toast.error(response.data.error)
    }
    else{
        toast.error("an unexpected error occured")
    }
}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    if (formData.current_password.trim() !== '') {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    }
  };
  return (
    <Dashboard>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="right-content">
          <h3>Change Password</h3>

          <form>
            <div className="form-group mb-3">
              <label htmlFor="current_password">Current Password</label>
              <div className="password-input">
              <input type={showPassword ? 'text' : 'password'}
                  name="current_password"
                  id="current_password"
                  placeholder="Enter Your Current Password"
                  className="form-control"
                  value={formData.current_password}
                  onChange={handleInputChange}
                />
                 {formData.current_password.trim() !== '' && (
                  <span
                    className="eye-icon"
                    data-testid="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    <Icon icon={showPassword ? eye : eyeOff} size={25} />
                  </span>
                )}
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="new_password">New Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="new_password"
                  id="new_password"
                  placeholder="Enter Your New Password"
                  className="form-control"
                  value={formData.new_password}
                  onChange={handleInputChange}
                />
                {formData.current_password.trim() !== '' && (
                  <span
                    className="eye-icon"
                    data-testid="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    <Icon icon={showPassword ? eye : eyeOff} size={25} />
                  </span>
                )}
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="confirm_password">Confirm Password</label>
              <div className="password-input">
                <input
                  type='password'
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Your Password"
                  className="form-control"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                data-testid="submitButton"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export default ChangePassword;