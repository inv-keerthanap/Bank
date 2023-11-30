import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

function Dashboard({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user ? user.userType : null;
  const userName = user ? user.name : null;
  const navigate = useNavigate();



  const dashboardContent = {
    admin: [
      
      { label: "Register Staff and Manager", link: "/ManagerStaffRegister", icon: "fa fa-user-circle" },
      { label: "Manager Details", link: "/ListManager", icon: "fa fa-users" },
      { label: "Staff Details", link: "/ListStaff", icon: "fa fa-users" },
    ],
    customer: [
      
      { label: "Create Account", link: "/Account", icon: "fa fa-bank" },
      { label: "View Account", link: "/CustomerAccountView", icon: "fa fa-bank" },
      { label: "Deposit", link: "/Deposit", icon: "fa fa-money" },
      { label: "Withdraw", link: "/Withdraw", icon: "fa fa-money" },
      { label: "Transaction Details", link: "/CustomerTransaction", icon: "fa fa-money" },
     
    ],
    manager: [
     
     
      { label: "Staff Details", link: "/ListStaff", icon: "fa fa-users" },
      { label: "Customer Details", link: "/ListApprovedCustomer", icon: "fa fa-users" },
      { label: "Account Details", link: "/AccountView", icon: "fa fa-bank" },
      { label: "Transaction Details", link: "/ListTransaction", icon: "fa fa-money" },
    ],
    staff: [
     
      { label: "Pending Customers", link: "/ListPendingCustomers", icon: "fa fa-users" },
      { label: "Approved Customers", link: "/ListApprovedCustomer", icon: "fa fa-users" },
      { label: "Account Details", link: "/AccountView", icon: "fa fa-bank" },
      { label: "Transactions Details", link: "/ListTransaction", icon: "fa fa-money" },
    ],
  };



  return (
    <>
   <Header userName={userName} userType={userType} />
      <div className="dashboard-container">
        <div className="sidebar">
          {userType &&
            dashboardContent[userType] &&
            dashboardContent[userType].map((item, index) => (
              <a key={index} href={item.link}>
                <i className={item.icon}></i> {item.label}
              </a>
            ))}
        </div>
        <div className="main-content">
          {children}
        </div>
      </div>
      <Footer userType={userType} />
    </>
  );
}

export default Dashboard;
