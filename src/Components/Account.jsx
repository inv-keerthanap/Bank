import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { accountService } from '../urls';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Account() {
  const [accountType, setAccountType] = useState('');
  const [userId, setUserId] = useState('');
  const [accountTypeError, setAccountTypeError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = JSON.parse(storedUser || '{}');
    if (userData && userData.id) {
      setUserId(userData.id);
    }
  }, []);

  const handleCreate = async () => {
    if (!accountType) {
      setAccountTypeError('Please select an account type.');
      return;
    }

    try {
      const storedUser = localStorage.getItem('user');
      const userData = JSON.parse(storedUser || '{}');
  
      if (!userData || !userData.id) {
      
        return;
      }
  
      const response = await accountService.CreateAccount(
        userData.id,
        accountType,
        'xyz900',
        new Date().toISOString().split('T')[0],
        0,
        'active'
      );
      if (response && response.status === 201) {
        toast.success("Account created successfully!");
      }
  
     
    } catch (error) {
      toast.error("You can not create multiple account");
    }
  };
  

  return (
    <Dashboard userType="customer">
      <div className="right-content">
        <h3><i>Create Account!!!</i></h3>
        <div className="container d-flex justify-content-center">
          <form>
            <div className="form-group mb-3">
            <label htmlFor="accountType">Select Account Type:</label>
              <select data-testid="select"
                value={accountType}
                onChange={(e) => {
                  setAccountType(e.target.value);
                  setAccountTypeError('');
                }}
              >
                <option value="" disabled>
                  Select Account Type
                </option>
                <option value="savings">Savings</option>
                <option value="salary">Salary</option>
                <option value="fixed_deposit">Fixed Deposit</option>
                <option value="current">Current</option>
              </select>
              {accountTypeError && (
                <p className="error-message" style={{ color: 'red' }}>
                  {accountTypeError}
                </p>
              )}
            </div>
            <div className="text-center">
              <button
                type="button" data-testid="create"
                className="btn btn-primary"
                onClick={handleCreate}
              >
                Create
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export default Account;
