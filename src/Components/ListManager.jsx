import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import { customerService } from "../urls";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../intercepter";
const PAGE_SIZE = 2;
function ListManager() {
  const [managerList, setManagerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(1);
  const [pageSize] = useState(PAGE_SIZE)

  useEffect(() => {
    fetchManagerData();
  }, [searchQuery]);

  const fetchManagerData = () => {
    customerService.ListManager({ query: searchQuery })
      .then((response) => {
        if (Array.isArray(response.data.results)) {
          setManagerList(response.data.results);
          setNext(response.data.next);
          setPrevious(response.data.previous);
          setCurrentPage(1);
          setTotalPage(Math.ceil(response.data.count / PAGE_SIZE));
        }
      })
      
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    axiosPrivate.get(next)
      .then((response) => {
        setManagerList(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      
  };

  const handlePrevPage = () => {
    axiosPrivate.get(previous)
      .then((response) => {
        setManagerList(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setCurrentPage((prevPage) => prevPage - 1);
      })
  };
  return (
    <Dashboard>
      <div className="container">
        <h3 className="text-center"><i>Managers Details</i></h3>
        <div className="row justify-content-center mt-4">
      
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search by First Name, Email And Phone Number"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          

        </div>
       
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
          {managerList.length > 0 ? (
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
                {managerList.map((manager) => (
                  <tr key={manager.id}>
                    <td>{`${manager.firstName} ${manager.lastName}`}</td>
                    <td>{manager.email}</td>
                    <td>{manager.phoneNumber}</td>
                    <td>{manager.address}</td>
                    <td>{manager.pinCode}</td>
                    <td>{manager.dob}</td>
                    <td>
                      <Link to={`/ManagerUpdate/${manager.id}`}>
                        <button className="btn btn-info">Update</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            ) : (
              <p className="text-center mt-4">
              {searchQuery ? "No results found" : "No managers found"}
            </p>
              )}
                  <div>
                  {previous && (
                    <button className="btn btn-sm" onClick={handlePrevPage}>
                      Previous
                    </button>
                  )}
                  <span>{currentPage} of {totalPage}</span>
                  {next && (
                    <button className="btn btn-sm" onClick={handleNextPage}>
                      Next
                    </button>
                  )}
                </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default ListManager;