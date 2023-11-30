import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { customerService } from "../urls";
import Dashboard from "./Dashboard";
import { axiosPrivate } from "../intercepter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PAGE_SIZE = 2;
function ListPendingCustomers() {
  const [pendingCustomers, setPendingCustomers] = useState([]);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(1);
  const [pageSize] = useState(PAGE_SIZE);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = () => {
    customerService
      .ListPendingCustomers()
      .then((response) => {
        if (Array.isArray(response.data.results)) {
          setPendingCustomers(response.data.results);
          setNext(response.data.next);
          setPrevious(response.data.previous);
          setCurrentPage(1);
          setTotalPage(Math.ceil(response.data.count / PAGE_SIZE))
        } 
      })
  };

  const handleApprove = (customerId) => {
    customerService
      .ApproveCustomer(customerId)
      .then((response) => {
        setPendingCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== customerId)
        );
        toast.success("Customer approved successfully!");
      })
  };
  const handleReject = (customerId) => {
    customerService
      .RejectCustomer(customerId)
      .then((response) => {
        setPendingCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== customerId)
        );
        toast.error("Pending customer rejected successfully");
      })
      
  };
  const handleNextPage = () => {
    axiosPrivate
      .get(next)
      .then((response) => {
        setPendingCustomers(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setCurrentPage((prevPage) => prevPage + 1);
      })
  };
  const handlePrevPage = () => {
    axiosPrivate
      .get(previous)
      .then((response) => {
        setPendingCustomers(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setCurrentPage((prevPage) => prevPage - 1);
      })
  };
  return (
    <>
      <Dashboard>
      <div className="container">
  <h3 className="text-center"><i>Pending Customers</i></h3>
  <div className="row mt-4">
    <div className="col-md-10 offset-md-1">
      {pendingCustomers.length > 0 ? (
        <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.firstName}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.address}</td>
              <td>{customer.pinCode}</td>
              <td>{customer.dob}</td>
              <td className="d-flex align-items-center justify-content-start">
                <button
                  className="btn btn-success mr-2"
                  data-testid="b1"
                  onClick={() => handleApprove(customer.id)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  data-testid="b2"
                  onClick={() => handleReject(customer.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      ) : (
        <p><center>No Pending Customers</center></p>
      )}
      <div className="btn-group" role="group">
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
    </>
  );
}

export default ListPendingCustomers;