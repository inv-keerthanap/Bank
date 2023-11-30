    import React, { useState } from "react";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "./ManagerStaff.css";
    import Dashboard from "./Dashboard";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import { customerService } from "../urls";

    function ManagerStaffRegister() {
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [phoneNumber, setPhoneNumber] = useState("");
      const [address, setAddress] = useState("");
      const [isValidAddress, setIsValidAddress] = useState(true);
      const [username, setUserName] = useState("");
      const [pinCode, setPinCode] = useState("");
      const [dob, setDob] = useState("");
      const [userType, setUserType] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [approvalStatus, setApprovalStatus] = useState("");
      const [isRegistering,setIsRegistering] = useState(false);
      const [Registeringcomplete,setRegisteringComplete] = useState(false);

      const [firstNameValid, setFirstNameValid] = useState(true);
      const [lastNameValid, setLastNameValid] = useState(true);
      const [emailValid, setEmailValid] = useState(true);
      const [phoneNumberValid, setPhoneNumberValid] = useState(true);
      const [usernameValid, setUsernameValid] = useState(true);
      const [pinCodeValid, setPinCodeValid] = useState(true);
      const [dobValid, setDobValid] = useState(true);
      const [dobError, setDobError] = useState(true);
      const [passwordValid, setPasswordValid] = useState(true);
      const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
      const [approvalStatusValid, setApprovalStatusValid] = useState(true);
      const [userTypeValid, setUserTypeValid] = useState(true);
    




      const handleRegister = async () => {
        if (
          !firstNameValid ||
          !lastNameValid ||
          !emailValid ||
          !phoneNumberValid ||
          !isValidAddress ||
          !usernameValid ||
          !pinCodeValid ||
          !dobValid ||
          !passwordValid ||
          !confirmPasswordValid
        ) {
          toast.error("Please fill in all fields correctly.");
          return;
        }
        setIsRegistering(true);



        const userData = {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          username,
          pinCode,
          dob,
          userType,
          password,
          approvalStatus,
        };
    
        try {
          const response = await customerService.RegisterView(userData);
          console.log(response);
          toast.success("Registration successful!");
          setRegisteringComplete(true);
          setTimeout(()=>
          {
            setIsRegistering(false)
            setRegisteringComplete(false)
          },6000);
        } catch (error) {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            if (errorMessage.includes('Email is already registered.')) {
       
              toast.error(errorMessage);
            } else {
          
              console.error(error);
            }
          }
        }
        finally{
          setIsRegistering(false);
        }
      };
        

    
      const validateFirstName = (value) => {
        const isValid = value.length >= 3 && value.length <= 50 && /^[a-zA-Z]+$/.test(value);
        setFirstNameValid(isValid);
        return isValid;
      };

      const validateLastName = (value) => {
        const isValid = value.length >= 1 && value.length <= 50 && /^[a-zA-Z]+$/.test(value);
        setLastNameValid(isValid);
        return isValid;
      };
      
      const validateEmail = (value) => {
        const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        setEmailValid(isValid);
        return isValid;
      };

      const validatePhoneNumber = (value) => {
        const isValid = /^[0-9]+$/.test(value) && value.length === 10;
        setPhoneNumberValid(isValid);
        return isValid;
      };

      const handleAddressChange = (e) => {
        const inputValue = e.target.value;
        setAddress(inputValue);
        const isValidLength = inputValue.length >= 20 && inputValue.length <= 250;
        const isValidFormat = /^[a-zA-Z0-9]+$/.test(inputValue);
        setIsValidAddress(isValidLength && isValidFormat);
      };
    
      const validateUsername = (value) => {
        const isValid = /^[a-zA-Z0-9]{3,20}$/.test(value);
        setUsernameValid(isValid);
        return isValid;
      };

      const validatePinCode = (value) => {
        const isValid = /^[0-9]+$/.test(value) && value.length === 6;
        setPinCodeValid(isValid);
        return isValid;
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
        const isValid =
          value.length >= 8 &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
            value
          );
        setPasswordValid(isValid);
        return isValid;
      };

      const validateConfirmPassword = (value) => {
        const isValid = value === password;
        setConfirmPasswordValid(isValid);
        return isValid;
      };

      const validateUserType = (value) => {
        const validUserTypes = ["customer", "manager", "staff"];
        const isValid = validUserTypes.includes(value.toLowerCase());
        setUserTypeValid(isValid);
        return isValid;
      }

    const validateApprovalStatus = (value) => {
    
      const isValid = value.toLowerCase() === "approved"; 
      setApprovalStatusValid(isValid);
      return isValid;
    };

      const validateForm = () => {
        const isValid =
          validateFirstName(firstName) &&
          validateLastName(lastName) &&
          validateEmail(email) &&
          validatePhoneNumber(phoneNumber) &&
          isValidAddress(address) &&
          validateUsername(username) &&
          validatePinCode(pinCode) &&
          validateDob(dob) &&
          validatePassword(password) &&
          validateConfirmPassword(confirmPassword)&&
          validateApprovalStatus(approvalStatus) && 
          validateUserType(userType);

        return isValid;
      };
      const handleInputChange = (e, validationFunction) => {
        const inputValue = e.target.value;
        validationFunction(inputValue);
      };

      return (
        <Dashboard>
          <div className="container mt-1 text-center">
            <h3 className="text-center"><i>Manager And Staff Registration</i></h3>
            <div className="register-page">     
            <div className="row">
            <div className="col-md-6">
                  <label className="text">First Name</label>
                  <input
                    type="text" data-testid="firstName"
                    name="firstName"
                    className={`normal-input ${!firstNameValid ? "invalid" : ""}`}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validateFirstName(e.target.value);
                    }}
                    placeholder="First Name"
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
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validateLastName(e.target.value);
                    }}
                    placeholder="Last Name"
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
                  type="email" data-testid="email"
                  name="email"
                  className={`normal-input ${!emailValid ? "invalid" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  placeholder="Email"  
                  required
                />
                {!emailValid && (
                  <span className="validation-message">Please enter a valid email address.</span>
                )}
              </div>

              <div className="col-md-6">
                  <label className="text">Phone Number</label>
                  <input
                    type="text"  data-testid="phoneNumber"
                    name="phoneNumber"
                    className={`normal-input ${!phoneNumberValid ? "invalid" : ""}`}
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      validatePhoneNumber(e.target.value);
                    }}
                    placeholder="Phone Number"
                    required
                  />
                  {!phoneNumberValid && (
                    <span className="validation-message">Please enter a valid 10-digit phone number.</span>
                  )}
                </div>
              </div>

          
              <div className="row">
            <div className="col-md-6">
              <label className="text">Username</label>
              <input
                type="text" data-testid="username"
                name="username"
                className={`normal-input ${!usernameValid ? "invalid" : ""}`}
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                  validateUsername(e.target.value);
                }}
                placeholder="Username"
                required
              />
              {!usernameValid && (
                <span className="validation-message">
                  Username should only contain letters, numbers, and underscores.
                </span>
              )}
            </div>

            <div className="col-md-6">
              <label className="text">Address</label>
              <textarea
              name="address"   data-testid="address"
              className={`normal-input ${!isValidAddress ? "invalid" : ""}`}
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter Your Address"
              required
            />
            {!isValidAddress && (
              <span className="validation-message">
                Address should not exceed 255 characters and not lesser than 20 characters
              </span>
            )}
          </div>
          </div>

                
          <div className="row">
            <div className="col-md-6">
            <label className="text">PinCode</label>
            <input
              type="text"  data-testid="pinCode"
              name="pinCode"
              className={`normal-input ${!pinCodeValid ? "invalid" : ""}`}
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value);
                validatePinCode(e.target.value);
              }}
              placeholder="Enter PinCode"
              required
            />
            {!pinCodeValid && (
              <span className="validation-message">
                PinCode should be a 6-digit number.
              </span>
            )}
          </div>
          <div className="col-md-6">
  <label className="text">Date of Birth</label>
  <input
    type="date" data-testid="dob"
    name="dob"
    className={`normal-input ${!dobValid ? "invalid" : ""}`}
    value={dob}
    onChange={(e) => {
      setDob(e.target.value);
      validateDob(e.target.value); 
    }}
    placeholder="DD-MM-YYYY"
    id="dob1"
    min="1930-12-31"
    max="2000-12-31"
  />
  {!dobValid && (
    <span className="validation-message">
      {dobError || "Enter a valid Date of Birth."}
    </span>
  )}
</div>

    </div>

    <div className="row">
            <div className="col-md-6">
        <label className="text">Password</label>
        <input  
          type="password"   data-testid="password-input"
          name="password"
          className={`normal-input ${!passwordValid ? "invalid" : ""}`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          placeholder="Password"
          required
        />
        {!passwordValid && (
          <span className="validation-message">
           Password should be at least 8 characters long.Password sholud contain one uppercase letter,one lower case letter,one digit and one special character;
          </span>
        )}
      </div>
      <div className="col-md-6">
        <label className="text">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"  data-testid="confirmpassword-input"
          className={`normal-input ${!confirmPasswordValid ? "invalid" : ""}`}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword(e.target.value);
          }}
          placeholder="Enter Confirm Password"
          required
        />
        {!confirmPasswordValid && (
          <span className="validation-message">Passwords do not match.</span>
        )}
      </div>
    </div>

    <div className="row">
            <div className="col-md-6">
        <label className="text">Approval Status</label>
        <select
      name="approvalStatus" data-testid="approvalStatus"
      className={`normal-input ${!approvalStatusValid ? "invalid" : ""}`}
      value={approvalStatus}
      onChange={(e) => {
        setApprovalStatus(e.target.value);
        validateApprovalStatus(e.target.value); 
      }}
    >

          <option value="" disabled>
                      Select Approval Status
                    </option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        {!approvalStatus && (
      <span className="validation-message">Please select an approval status.</span>
     )}
      </div>
      <div className="col-md-6">
  <label className="text">User Type</label>
  <select
    name="userType"
    className={`normal-input ${!userTypeValid ? "invalid" : ""}`}
    value={userType} data-testid="userType"
    onChange={(e) => {
      setUserType(e.target.value);
      validateUserType(e.target.value);
    }}
  >
    <option value="" disabled>
      Select User Type
    </option>
    <option value="manager">Manager</option>
    <option value="staff">Staff</option>
  </select>
  {!userType && (
    <span className="validation-message">Please select a user type.</span>
  )}
</div>
    </div>
    <button className="btn btn-dark" data-testid="register"  onClick={handleRegister} disabled={isRegistering || Registeringcomplete}>
                {isRegistering ? "Registering......":(Registeringcomplete ? "Registered" : "Register")}
              </button>
              <ToastContainer/>
            </div>
            </div>
            </Dashboard>

      );
    }

    export default ManagerStaffRegister;
