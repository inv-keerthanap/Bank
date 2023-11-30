import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./list.css";
import Dashboard from "./Dashboard";
import { accountService } from "../urls";
import { axiosPrivate } from '../intercepter';
const PAGE_SIZE = 2
function AccountView() {
  const [account, setAccount] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [currentPage,setcurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(1);
  const [pageSize] = useState(PAGE_SIZE)

  useEffect(() => {
    fetchAccountData();
  }, [searchQuery]);

  const fetchAccountData = () => {
    accountService.AccountStaffManager({ query: searchQuery })
      .then((response) => {
        if (Array.isArray(response.data.results)) {
          setAccount(response.data.results);
          setNext(response.data.next);
          setPrevious(response.data.previous);
          setcurrentPage(1);
          setTotalPage(Math.ceil(response.data.count / pageSize));
        } 
      })
     
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setcurrentPage(1);
  };

  const handleNextPage = () => {
    axiosPrivate.get(next).then((response) => {
      setAccount(response.data.results)
      setNext(response.data.next)
      setPrevious(response.data.previous);
      setcurrentPage((prevPage) => prevPage + 1);
    })
      
  }

  const handlePrevPage = () => {
    axiosPrivate.get(previous).then((response) => {
      setAccount(response.data.results);
      setNext(response.data.next);
      setPrevious(response.data.previous);
      setcurrentPage((prevPage) => prevPage - 1);
    })
      
  }

  return (
    <Dashboard>
      <div className="container">
        <h3 className="text-center"><i>Account Details</i></h3>
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Acccount Number,Account Type,Account Status"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            {account.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Customer Name</th>
                    <th>Account Number</th>
                    <th>IFSC Code</th>
                    <th>Account Type</th>
                    <th>Account Created Date</th>
                    <th>Balance</th>
                    <th>Account Status</th>
                  </tr>
                </thead>
                <tbody>
                  {account.map((account) => (
                    <tr key={account.id}>
                      <td>{account.customerId ? account.customerId.firstName : 'N/A'}</td>
                      <td>{account.accountNumber}</td>
                      <td>{account.ifscCode}</td>
                      <td>{account.accountType}</td>
                      <td>{account.date}</td>
                      <td>{account.balance}</td>
                      <td>{account.accountStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center mt-4">
              {searchQuery && account.length === 0 ? "No results found" : "No account details found"}
            </p>
            )}

          

            <div>
              {previous && (
                <button className="btn btn-sm" onClick={handlePrevPage}>Previous</button>
              )}
              <span>{currentPage} of {totalPage}</span>
              {next && (
                <button className="btn btn-sm" onClick={handleNextPage}>Next</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default AccountView;
