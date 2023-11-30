import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { customerService } from "../urls";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StaffUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    pinCode: "",
  });
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressValid, setAddressValid] = useState(true);
  const [pinCodeValid, setPinCodeValid] = useState(true);

  const handleFirstNameChange = (e) => {
    const inputValue = e.target.value;
    setFormData({ ...formData, firstName: inputValue });
    const isValidFirstName = inputValue.length >= 3 && inputValue.length <= 50;
    const isValidFormat = /^[a-zA-Z]+$/.test(inputValue);
    setFirstNameValid(isValidFirstName && isValidFormat);
  };

  const handleLastNameChange = (e) => {
    const inputValue = e.target.value;
    setFormData({ ...formData, lastName: inputValue });
    setLastNameValid(inputValue);
    const isValidLastName = inputValue.length >= 1 && inputValue.length <= 50;
    const isValidFormat = /^[a-zA-Z]+$/.test(inputValue);
    setLastNameValid(isValidLastName && isValidFormat);
  };

  const handleEmailChange = async (e) => {
    const inputValue = e.target.value;
    setFormData({ ...formData, email: inputValue });
    setEmailValid(inputValue);
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
    setFormData({ ...formData, phoneNumber: inputValue });
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

  const handleAddressChange = (e) => {
    const inputValue = e.target.value;
    setFormData({ ...formData, address: inputValue });
    const isValidAddress = inputValue.length >= 20 && inputValue.length <= 250;
    setAddressValid(isValidAddress);
  };

  const handlePinCodeChange = (e) => {
    const inputValue = e.target.value;
    setFormData({ ...formData, pinCode: inputValue });

    const isValidPinCode = /^[0-9]+$/.test(inputValue) && inputValue.length === 6;
    setPinCodeValid(isValidPinCode);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await customerService.GetUpdate(String(id));
        const userData = response.data;
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          address: userData.address || "",
          pinCode: userData.pinCode || "",
        });
      } catch (error) {}
    };

    fetchUserDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await customerService.Update(String(id), formData);

      if (response.data.message === "User details updated successfully") {
        toast.success("User details updated successfully");
        navigate("/ListStaff");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("Email is already exists")) {
          toast.error(errorMessage);
        } else {
          toast.error("Failed to update user details. Please try again.");
        }
      }
    }
  };

  return (
    <Dashboard>
      <div className="container mt-4">
        <h3 className="text-center"><i>Staff Updation</i></h3>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="inputFirstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${!firstNameValid ? "is-invalid" : ""}`}
                    id="inputFirstName" data-testid="firstname"
                    placeholder="Enter Your First Name"
                    value={formData.firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                  {!firstNameValid && (
                    <div className="invalid-feedback">
                      First name should be at least 3 characters long and contain only alphabetic characters.
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName" data-testid="lastname"
                    className={`form-control ${!lastNameValid ? "is-invalid" : ""}`}
                    id="inputLastName"
                    placeholder="Enter Your Last Name"
                    value={formData.lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                  {!lastNameValid && (
                    <div className="invalid-feedback">
                      Last name should be between 1 and 50 characters long and contain only alphabetic characters.
                    </div>
                  )}
                </div>
              </div>
            
              <div className="mb-3">
                <div className="col-md-12">
                  <label htmlFor="inputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    data-testid="email"
                    className={`form-control ${!emailValid ? "is-invalid" : ""}`}
                    placeholder="Enter Your Email Id"
                    value={formData.email}
                    onChange={handleEmailChange}
                    required
                  />
                  {!emailValid && (
                    <div className="invalid-feedback">{emailError}</div>
                  )}
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="inputPhoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    data-testid="phonenumber"
                    name="phoneNumber"
                    className={`form-control ${!phoneNumberValid ? "is-invalid" : ""}`}
                    placeholder="Enter Your Phone Number"
                    value={formData.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                  />
                  {!phoneNumberValid && (
                    <div className="invalid-feedback">{phoneNumberError}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPinCode" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    data-testid="pincode"
                    className={`form-control ${!pinCodeValid ? "is-invalid" : ""}`}
                    value={formData.pinCode}
                    onChange={handlePinCodeChange}
                    placeholder="Enter Your Postal Code"
                    required
                  />
                  {!pinCodeValid && (
                    <div className="invalid-feedback">
                      PIN code should only contain numeric digits and be exactly 6 digits long.
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <textarea
                  name="address"
                  className={`form-control ${!addressValid ? "is-invalid" : ""}`}
                  value={formData.address}
                  data-testid="address"
                  onChange={handleAddressChange}
                  placeholder="Enter Your Address"
                  required
                />
                {!addressValid && (
                  <div className="invalid-feedback">
                    Address should not exceed 255 characters and be less than 20 characters.
                  </div>
                )}
              </div>

              <button type="submit"  data-testid="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default StaffUpdate;