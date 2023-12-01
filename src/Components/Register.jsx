import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Register.css';

import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customerService } from "../urls";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState("");
  const [lastNameValid, setLastNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [username, setUserName] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [pinCode, setPinCode] = useState("");
  const [pinCodeValid, setPinCodeValid] = useState(true);
  const [dob, setDob] = useState("");
  const [dobValid, setDobValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const today = new Date().toISOString().split("T")[0];
  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false);


  const handleFirstNameChange = (e) => {
    const inputValue = e.target.value;
    setFirstName(inputValue);
    const isValidLength = inputValue.length >= 3 && inputValue.length <= 50;
    const isValidFormat = /^[a-zA-Z]+$/.test(inputValue);
    setFirstNameValid(isValidLength && isValidFormat);
  };

  const handleLastNameChange = (e) => {
    const inputValue = e.target.value;
    setLastName(inputValue);
    const isValidLength = inputValue.length >= 1 && inputValue.length <= 50;
    const isValidFormat = /^[a-zA-Z]+$/.test(inputValue);
    setLastNameValid(isValidLength && isValidFormat);
  };
  

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    const { isValid, errorMessage } = validateEmail(inputValue);
    setEmailValid(isValid);

    if (!isValid) {
      setEmailError(errorMessage);
    }
  };

  const validateEmail = (value) => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

    if (!isEmailValid) {
      let errorMessage = "Enter a valid email address.";

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errorMessage += " Missing special character(s).";
      }

      if (!/\d/.test(value)) {
        errorMessage += " Missing number(s).";
      }

      return { isValid: false, errorMessage };
    }

    return { isValid: true, errorMessage: "" };
  };

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    setPhoneNumber(inputValue);
    const isValidPhoneNumber = validatePhoneNumber(inputValue);
    setPhoneNumberValid(isValidPhoneNumber);

    if (!isValidPhoneNumber) {
      setPhoneNumberError("Invalid phone number");
    }
  };

  const validatePhoneNumber = (value) => {
    if (!/^[0-9]+$/.test(value)) {
      setPhoneNumberError("Phone number should only contain numeric digits.");
      return false;
    }
    if (value.length !== 10) {
      setPhoneNumberError("Phone number should be 10 digits long.");
      return false;
    }
    setPhoneNumberError("");
    return true;
  };

  const handleUsernameChange = (e) => {
    const inputValue = e.target.value;
    setUserName(inputValue);
    const isValidUsername = /^[a-zA-Z0-9]{3,20}$/.test(inputValue);
    setUsernameValid(isValidUsername);
  };

  const handleAddressChange = (e) => {
    const inputValue = e.target.value;
    setAddress(inputValue);
    const isValidLength = inputValue.length >= 20 && inputValue.length <= 250;
    const isValidFormat = /^[a-zA-Z0-9]+$/.test(inputValue);
    setIsValidAddress(isValidLength && isValidFormat);
  };

  const handlePinCodeChange = (e) => {
    const inputValue = e.target.value;
    setPinCode(inputValue);

    const isValidPinCode = /^[0-9]+$/.test(inputValue) && inputValue.length === 6;
    setPinCodeValid(isValidPinCode);
  };

  const validateDob = (value) => {
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isValidFormat = dobRegex.test(value);
  
    if (!isValidFormat) {
      setDobValid(false);
      return false;
    }
  
    const selectedDate = new Date(value);
    const currentDate = new Date();
    const isValid = selectedDate <= currentDate;
    setDobValid(isValid);
    if (!isValid) {
      toast.error("Please select a valid date of birth (not in the future).");
    }
  
    return isValid;
  };
  

  const validatePassword = (value) => {
    let isValid = true;
    let errorMessage = "";

    if (value.length < 8) {
      isValid = false;
      errorMessage = "Password should be at least 8 characters long.Password sholud contain one uppercase letter,one lower case letter,one digit and one special character";
    } else {
      
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
      if (!regex.test(value)) {
        isValid = false;
        errorMessage = "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character.";
      }
    }

    setPasswordError(errorMessage);

    return { isValid, errorMessage };
  };

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const { isValid, errorMessage } = validatePassword(inputValue);
    setPasswordValid(isValid);

    if (!isValid) {
      setPasswordError(errorMessage);
    } else {
      setPasswordError("");
    }

    setPasswordsMatch(confirmPassword === inputValue);
  };

  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
    setPasswordsMatch(password === inputValue);
  };

  const handleRegister = async () => {
    if (!passwordsMatch || !passwordValid) {
   
      return;
    }
    setIsRegistering(true);

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      username: username,
      pinCode: pinCode,
      dob: dob,
      password: password,
      userType: "customer",
    };
    
    try {
      const response = await customerService.RegisterView(userData);
      console.log(response);
      toast.success("Registration successful! You can log in after approval.");
      setRegistrationComplete(true);
      setTimeout(() => {
        setIsRegistering(false);
        setRegistrationComplete(false);
      }, 5000);

    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('Email is already registered.')) {
   
          toast.error(errorMessage);
        } else {
      
        
        }
      }
    }
    finally {
      setIsRegistering(false); 
    }
  };
    


  return (
    <div className="login-page">
      <div className="left-content">
        <img src="images/bg3.jpeg" alt="Image" />
      </div>
      <div className="right-content">
        <h3>Register</h3>
        <div className="row">
            <div className="col-md-6">

          <label  className="text" htmlFor="firstName">First Name:</label>
           
            <input
              type="text"
              name="firstName"   
              data-testid="firstName"
              className={`normal-input ${!firstNameValid ? "invalid" : ""}`}
              placeholder="Enter Your First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
            {!firstNameValid && (
              <span className="validation-message">
                First name should be at least 3 characters long and contain only alphabetic characters.
              </span>
            )}
          </div>
          <div className="col-md-6">
            <label className="text">Last Name</label>
            <input
              type="text"
              name="lastName" data-testid="lastName"
              className={`normal-input ${!lastNameValid ? "invalid" : ""}`}
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
            {!lastNameValid && (
              <span className="validation-message">
                Last name should be between 1 and 50 characters long and contain only alphabetic characters.
              </span>
            )}
          </div>
        </div>

        <div className="row">
            <div className="col-md-6">
            <label className="text">Email</label>
            <input
              type="email"
              name="email" data-testid="email"
              className={`normal-input ${!emailValid ? "invalid" : ""}`}
              placeholder="Enter Your Email Id"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {!emailValid && (
              <span className="validation-message">
                {emailError}
              </span>
            )}
          </div>
          <div className="col-md-6">
            <label className="text">Phone Number</label>
            <input
              type="text"
              name="contact" data-testid="contact"
              className={`normal-input ${!phoneNumberValid ? "invalid" : ""}`}
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
            {!phoneNumberValid && (
              <span className="validation-message">
                {phoneNumberError}
              </span>
            )}
          </div>
        </div>

        <div className="row">
            <div className="col-md-6">
            <label className="text">UserName</label>
            <input
              type="text"
              name="username"  data-testid="username"
              className={`normal-input ${!usernameValid ? "invalid" : ""}`}
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Your username"
              required
            />
            {!usernameValid && (
              <span className="validation-message">
                Username should only contain alphanumeric characters and be 3 to 20 characters long.
              </span>
            )}
          </div>
          <div className="col-md-6">
            <label className="text">Address</label>
            <textarea
              name="address"  data-testid="address"
              className={`normal-input ${!isValidAddress ? "invalid" : ""}`}
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter Your Address"
              required
            />
            {!isValidAddress && (
              <span className="validation-message">
                Address should not exceed 255 characters and not lesser than 20 characters.
              </span>
            )}
          </div>
        </div>

        <div className="row">
            <div className="col-md-6">
            <label className="text">UserName</label>
            <input
              type="text"
              name="username"  data-testid="username"
              className={`normal-input ${!usernameValid ? "invalid" : ""}`}
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Your username"
              required
            />
            {!usernameValid && (
              <span className="validation-message">
                Username should only contain alphanumeric characters and be 3 to 20 characters long.
              </span>
            )}
          </div>
          <div className="col-md-6">
            <label className="text">Date of Birth</label>
            <input
      type="date"
      name="dob" data-testid="dob"
      className={`normal-input ${!dobValid ? "invalid" : ""}`}
      value={dob}
      onChange={(e) => {
        setDob(e.target.value);
        validateDob(e.target.value);
      }}
      min="1900-01-01" 
      max={today} 
      placeholder="DD-MM-YYYY"
      required
    />
    {!dobValid && (
      <span className="validation-message">
        Please enter a valid date in the format DD-MM-YYYY and not in the future.
      </span>
    )}
  </div>
        </div>

        <div className="row">
            <div className="col-md-6">
            <label className="text">Password</label>
            <input
              type="password"  data-testid="password-input"
              name="password"
              className={`normal-input ${!passwordValid ? "invalid" : ""}`}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Your Password"
              required
            />
            {passwordError && (
              <span className="validation-message">
                {passwordError}
              </span>
            )}
          </div>

          <div className="col-md-6">
            <label className="text">Confirm Password</label>
            <input
              type="password" data-testid="confirmpassword-input"
              name="confirmpassword"
              className={`normal-input ${!passwordsMatch ? "invalid" : ""}`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Enter Confirm Password"
              required
            />
            {!passwordsMatch && (
              <span className="validation-message">
                Passwords do not match.
              </span>
            )}
          </div>
        </div>
              <button
        className="btn-primary"
        data-testid="register-btn"
        onClick={handleRegister}
        disabled={isRegistering || registrationComplete}
      >
        {isRegistering ? "Registering..." : (registrationComplete ? "Registered" : "Register")}
      </button>

        <p className="text-center mt-3">Go back to login???
          <Link to="/" style={{ color: 'RoyalBlue' }}>Login</Link>
        </p>
      
      </div>
    </div>
  );
}

export default Register;
