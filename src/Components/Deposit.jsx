import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Deposit.css'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TransactionService } from "../urls";
import Dashboard from "./Dashboard";

function Deposit() {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [isDepositing,setIsDepositing] = useState(false);
  const [depositingComplete,setComplete] = useState(false)

  const validateAmount = (value) => {
    try {
      const parsedAmount = parseFloat(value);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setAmountError('Invalid amount. Please enter a positive number.');
        return false;
      } else {
        setAmountError('');
        return true;
      }
    } catch (error) {
      setAmountError('Invalid amount. Please enter a valid number.');
      return false;
    }
  };

  const handleDeposit = async () => {
    if (!validateAmount(amount)) {
      return;
    }
  
    setIsDepositing(true);
  
    try {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (!user || !user.accountId) {
        toast.error("You need to relogin to deposit amount.");
        return;
      }
  
      const account_id = user.accountId;
      const accountResponse = await TransactionService.getAccountDetails(account_id);
      const accountStatus = accountResponse.data.accountStatus;
  
      if (accountStatus === 'closed') {
        toast.error("Cannot deposit. Your Account is closed.");
        return;
      }

      const response = await TransactionService.deposit(account_id, {
        amount: parseFloat(amount),
        transactionType: 'deposit',
        transactionStatus: 'success',
      });
  
      toast.success("Amount deposited successfully!!!!");
      setComplete(true);
  
      setTimeout(() => {
        setComplete(false);
      }, 6000);
    } catch (error) {
      if (error.response && error.response.data.message === 'Insufficient balance for withdrawal') {
        toast.error("Insufficient balance for withdrawal.");
      }
    } finally {
      setIsDepositing(false);
    }
  };
  

  return (
    <Dashboard>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="right-content">
          <h3><i>Deposit Money</i></h3>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                name="amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`form-control ${amountError ? 'is-invalid' : ''}`}
                placeholder="Enter amount to deposit"
              />
              {amountError && (
                <div className="invalid-feedback">
                  {amountError}
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                type="button" data-testid="submitButton"
                className="btn btn-primary"
                onClick={handleDeposit}
                disabled = {isDepositing || depositingComplete}
              >
                {isDepositing ? "Depositing......":(depositingComplete ? "Deposited" : "Submit")}
                
              </button>
           
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export default Deposit;
