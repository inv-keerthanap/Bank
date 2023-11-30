import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import { customerService } from "../urls";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../intercepter";
const PAGE_SIZE = 2;
function ListStaff() {
  const [staffList, setStaffList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userType, setUserType] = useState("");
  const [next,setNext] = useState("");
  const [previous,setPrevious] = useState("");
  const [pageSize] = useState(PAGE_SIZE);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(1);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = user ? user.userType : null;
    setUserType(userType);
  }, []);

  useEffect(() => {
    fetchStaffData();
  }, [searchQuery]);

  const fetchStaffData = () => {
    customerService
      .ListStaff({ query: searchQuery })
      .then((response) => {
        

        if (Array.isArray(response.data.results)) {
          setStaffList(response.data.results);
          setNext(response.data.next);
          setPrevious(response.data.previous);
          setCurrentPage(1);
          setTotalPage(Math.ceil(response.data.count / PAGE_SIZE))

        }
      })
      
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage=()=>{
    axiosPrivate.get(next).then((response)=>{
      setStaffList(response.data.results);
      setNext(response.data.next)
      setPrevious(response.data.previous);
      setCurrentPage((prevPage) => prevPage + 1);
    })
   
    }
    const handlePrevPage=()=>{
      axiosPrivate.get(previous).then((response)=>{
        setStaffList(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setCurrentPage((prevPage)=>prevPage - 1);
      })
      
    }
    
  

  return (
    <Dashboard>
      <div className="container">
        <h3 className="text-center"><i>Staffs Details</i></h3>
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
            {staffList.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>DOB</th>
                    {userType !== "admin" && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((staff) => (
                    <tr key={staff.id}>
                      <td>{`${staff.firstName} ${staff.lastName}`}</td>
                      <td>{staff.email}</td>
                      <td>{staff.phoneNumber}</td>
                      <td>{staff.address}</td>
                      <td>{staff.pinCode}</td>
                      <td>{staff.dob}</td>
                      {userType !== "admin" && (
                        <td>
                          <Link to={`/StaffUpdate/${staff.id}`}>
                            <button className="btn btn-info">Update</button>
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center mt-4">
              {searchQuery ? "No results found" : "No staff found"}
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

export default ListStaff;