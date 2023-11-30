import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./list.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Dashboard";
import { TransactionService } from '../urls';

const CustomerTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState('');
  const [isDownloading,setIsdownloading] = useState(false)
  const [downloadingComplete,setDownloadingComplete] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = JSON.parse(storedUser || '{}');
    if (userData && userData.id && userData.id.customerId) {
      const userIdString = userData.id.customerId.toString();
      setUserId(userIdString);
      fetchTransactionDetails(userIdString);
    }
  }, []);

  const fetchTransactionDetails = async (userId) => {
      const response = await TransactionService.CustomerTransaction(userId);

      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } 
    
  }
  const handleDownload = async () => {

      const response = await TransactionService.CustomerTransactionDownload(userId);
      const transactionsString = response.data;
      const blob = new Blob([transactionsString], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `transactions_customer_${userId}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Transaction details downloaded successfully!');
      setDownloadingComplete(true)
      setTimeout(()=>
      {
        setIsdownloading(false);
        setDownloadingComplete(false);
      },6000);
     
  };

  return (
    <>
      <Dashboard>
        <h3 className="text-center"><i>Transaction Details</i></h3>
        <div className="row justify-content-center">
          <div className="col-md-10">
          {transactions.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Transaction Type</th>
                  <th>Amount</th>
                  <th>Transaction Date And Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td data-testid="transactionType">{transaction.transactionType}</td>
                    <td data-testid="amount">{transaction.amount}</td>
                    <td data-testid="date">{transaction.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ):(
            <h4><center>No Transaction Details</center></h4>)}
          {transactions.length > 0 && (

            <button className="btn btn-primary"   data-testid="download" onClick={handleDownload}
            disabled = {isDownloading|| downloadingComplete}>
              {isDownloading ? "Downloading......":(downloadingComplete ? "Downloaded" : "Download")}
              <i class="fa fa-download"></i>
            
            </button>
          
          )}
           
          </div>
        </div>
      </Dashboard>
    </>
  );
}

export default CustomerTransaction;
