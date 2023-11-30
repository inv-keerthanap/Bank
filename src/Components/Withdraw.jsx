import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Deposit.css'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TransactionService } from "../urls";
import Dashboard from "./Dashboard";

function Withdraw() {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [isWithdrawing,setIsWithdrawing] = useState(false);
  const [withdrawingComplete,setWithdrawingComplete] = useState(false)

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

  const handleWithdraw = async () => {
    if (!validateAmount(amount)) {
      return;
    }
  
    setIsWithdrawing(true);
  
    try {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (!user || !user.accountId) {
        toast.error("You need to relogin to withdraw amount.");
        return;
      }
  
      const account_id = user.accountId;
      const accountResponse = await TransactionService.getAccountDetails(account_id);
      const accountStatus = accountResponse.data.accountStatus;
  
      if (accountStatus === 'closed') {
        toast.error("Cannot withdraw. Your Account is closed.");
        return;
      }
  
      const response = await TransactionService.withdraw(account_id, {
        amount: parseFloat(amount),
        transactionType: 'withdraw',
        transactionStatus: 'success',
      });
  
      toast.success("Amount withdrawn successfully!!!!");
      setWithdrawingComplete(true);
  
      setTimeout(() => {
        setWithdrawingComplete(false);
      }, 6000);
    } catch (error) {
      if (error.response && error.response.data.message === 'Insufficient balance for withdrawal') {
        toast.error("Insufficient balance for withdrawal.");
      }
    } finally {
      setIsWithdrawing(false);
    }
  };
  

  return (
    <Dashboard>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="right-content">
          <h3><i>Withdraw Money</i></h3>
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
                placeholder="Enter amount to withdraw"
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
                onClick={handleWithdraw}
                disabled = {isWithdrawing || withdrawingComplete}
              >
                {isWithdrawing ? "Withdrawing......":(withdrawingComplete ? "Withdrawed" : "Submit")}
                
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export default Withdraw;
