import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./list.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Dashboard";
import { accountService } from '../urls';

const CustomerAccountView = () => {
  const [accountDetails, setAccountDetails] = useState({});
  const [userId, setUserId] = useState('');
  const [accountStatus,setaccountStatus] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = JSON.parse(storedUser || '{}');

    if (userData && userData.id && userData.id.customerId) {
      const userIdString = userData.id.customerId.toString();
      setUserId(userIdString);
      fetchAccountDetails(userIdString);
    }
  }, []);

  const fetchAccountDetails = async (userId) => {
     try{
      const response = await accountService.AccountView(userId);
      setAccountDetails(response.data);
      setaccountStatus(response.data.accountStatus)
     }
     catch(error){
     }
  
  };

  const handleAccountStatus = async () => {
    const storedUser = localStorage.getItem('user');
    const userData = JSON.parse(storedUser || '{}');
  
    if (!userData || !userData.accountId) {
      return;
    }
  
    if (accountStatus === 'closed') {
      const response = await accountService.ReopenAccount(userData.accountId, {});
      fetchAccountDetails(userId);
      toast.success('Account reopened successfully');
    } else {
      const response = await accountService.CloseAccount(userData.accountId, {});
      fetchAccountDetails(userId);
      toast.success('Account closed successfully');
    }
  };
  

  return (
    <Dashboard>
      <h3 className="text-center"><i>Account Details</i></h3>
      <div className="row justify-content-center">
        <div className="col-md-10">
        {Object.keys(accountDetails).length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-testid="td-accountnumber">Account Number</td>
                <td>{accountDetails.accountNumber}</td>
              </tr>
              <tr>
                <td data-testid="td-ifsccode"> IFSC Code</td>
                <td>{accountDetails.ifscCode}</td>
              </tr>
              <tr>
                <td data-testid="td-accounttype"> Account Type</td>
                <td>{accountDetails.accountType}</td>
              </tr>
              <tr>
                <td data-testid="td-balance">Balance</td>
                <td>{accountDetails.balance}</td>
              </tr>
              <tr>
                <td data-testid="td-accountstatus">Account Status</td>
                <td>{accountDetails.accountStatus}</td>
              </tr>
              <tr>
                <td data-testid="td-date">Account Created Date</td>
                <td>{accountDetails.date}</td>
              </tr>
            </tbody>
          </table>
                    ) : (
                      <div className="text-center">
                        <p>No account found. Please create an account first.</p>
                      </div>
                    )}
           
           <button
        className={`btn ${accountStatus === 'closed' ? 'btn-success' : 'btn-danger'}`}
        data-testid={accountStatus === 'closed' ? 'reopen' : 'close'}
        onClick={handleAccountStatus}
      >
        {accountStatus === 'closed' ? 'Reopen Account' : 'Close Account'}
      </button>
      </div>
      </div>
    </Dashboard>
  );
}

export default CustomerAccountView;