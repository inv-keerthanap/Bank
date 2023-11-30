import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./list.css";
import { customerService } from "../urls";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { axiosPrivate } from "../intercepter";
const PAGE_SIZE=2;
function ListApprovedCustomer() {
  const [customerList, setCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userType, setUserType] = useState("");
  const [next,setNext] = useState("");
  const [previous,setPrevious] = useState("");
  const [currentPage,setcurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(1);
  const [pageSize]= useState(PAGE_SIZE);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = user ? user.userType : null;
    setUserType(userType);
  }, []);


  useEffect(() => {
    fetchCustomerData();
  }, [searchQuery]);

  const fetchCustomerData = () => {
    customerService.ListApprovedCustomers({ query: searchQuery })
      .then((response) => {
        
        if (Array.isArray(response.data.results)) {
          setCustomerList(response.data.results);
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

  const handleNextPage=()=>{
    axiosPrivate.get(next).then((response)=>{
    setCustomerList(response.data.results)
    setNext(response.data.next)
    setPrevious(response.data.previous)
    setcurrentPage((prevPage) => prevPage + 1);
    
  })
  
}
const handlePrevPage=()=>{
  axiosPrivate.get(previous).then((response)=>{
  setCustomerList(response.data.results);
  setNext(response.data.next);
  setPrevious(response.data.previous);
  setcurrentPage((prevPage) => prevPage - 1);
    })
  }


  return (
    <Dashboard>
    <div className="container">
    <h3 className="text-center"><i>Customers Details</i></h3>
    <div className="row justify-content-center mt-4">
      <div className="col-md-10">
        <input
          type="text"
          className="form-control"
          placeholder="Search by First Name, Email, Phone Number"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
    <div className="row justify-content-center mt-4">
          <div className="col-md-10">
          {customerList.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>DOB</th>
                   <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer) => (
                  <tr key={customer.id}>
                    <td>{`${customer.firstName} ${customer.lastName}`}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.address}</td>
                    <td>{customer.pinCode}</td>
                    <td>{customer.dob}</td>
                  
                        <td>
                         <Link to={`/CustomerUpdate/${customer.id}`}>
                            <button className="btn btn-info">Update</button>
                          </Link>
                        </td>
                      
                  </tr>
                ))}
              </tbody>
            </table>
              ) : (
                <p className="text-center mt-4">
              {searchQuery ? "No results found" : "No customer found"}
            </p>
              )}
              <div>
                {previous &&(
                  <button className="btn btn-sm" onClick={handlePrevPage}>Previous</button>
                )}
                <span>{currentPage} of {totalPage}</span>
                {next &&(
                  <button className="btn btn-sm" onClick={handleNextPage}>Next</button>
                )}
              </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default ListApprovedCustomer;