import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./list.css";
import Dashboard from "./Dashboard";
import { TransactionService } from '../urls';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosPrivate } from '../intercepter';

function ListTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [isTransaction,setIsTransaction] = useState(false);
  const [transactionComplete,setTransactionComplete] = useState(false);

  useEffect(() => {
    fetchTransactionData();
  }, [searchQuery]);

  const fetchTransactionData = async () => {
    try {
      
      const response = await TransactionService.Transactions(searchQuery);
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
        calculateTotals(response.data);
      } else {
       
      }
    } catch (error) {
      
    }
  };

  const calculateTotals = (data) => {
    const today = new Date().toISOString().split('T')[0];
    let depositTotal = 0;
    let withdrawTotal = 0;

    data.forEach((transaction) => {
      const transactionDate = transaction.dateTime.split('T')[0];
      if (transactionDate === today) {
        if (transaction.transactionType === 'deposit') {
          depositTotal += parseFloat(transaction.amount) || 0;
        } else if (transaction.transactionType === 'withdraw') {
          withdrawTotal += parseFloat(transaction.amount) || 0;
        }
      }
    });

    setTotalDeposit(depositTotal);
    setTotalWithdraw(withdrawTotal);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const downloadTransactions = async () => {
    try {
      const response = await TransactionService.TransactionDownload();
      const blob = new Blob([response.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'transactions.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Transaction details downloaded successfully");
      setTransactionComplete(true);
      setTimeout(()=>{
        setIsTransaction(false);
        setTransactionComplete(false);

      },6000);
    } catch (error) {
      toast.error("Error downloading transactions");
    }
    finally{
      setIsTransaction(false);
    }
  };

  return (
    <Dashboard>
      <div className="container">
        <h3 className="text-center"><i>Transaction Details</i></h3>
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Transaction Type, Amount, Transaction Date"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
          <div className="mb-4">
          <button style={{ marginRight: '10px' }} className="btn btn-secondary">
            Today's Total Deposit: {Number(totalDeposit)}
          </button>
          <button className="btn btn-secondary">
            Today's Total Withdraw: {Number(totalWithdraw)}
          </button>
        </div>



            {transactions.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Customer Name</th>
                    <th>Account Number</th>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>Transaction Date</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.account?.firstName || 'N/A'}</td>
                      <td>{transaction.account?.accountNumber || 'N/A'}</td>
                      <td>{transaction.transactionType}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.dateTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center mt-4">
                {searchQuery && transactions.length === 0
                  ? "No results found"
                  : "No transactions found"}
              </p>
            )}

            {transactions.length > 0 && (
          
              <button
                className="btn btn-primary" 
                data-testid="download" color="RoyalBlue"
                onClick={downloadTransactions} disabled={isTransaction || transactionComplete }
              >
                {isTransaction ? "Downlaoding....": (transactionComplete ? "Downloaded" : "Download")}
                <i class="fa fa-download"></i>
              </button>
            )}

            <ToastContainer />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default ListTransaction;
