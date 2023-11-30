import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Account from "./Components/Account";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import ListPendingCustomers from "./Components/ListPendingCustomers";
import ListManager from "./Components/ListManager";
import CustomerAccountView from "./Components/CustomerAccountView";
import ListTransaction from "./Components/ListTransaction";
import CustomerTransaction from "./Components/CustomerTransaction";
import ListStaff from "./Components/ListStaff";
import ListApprovedCustomer from "./Components/ListApprovedCustomer";
import StaffUpdate from "./Components/StaffUpdate";
import CustomerUpdate from "./Components/CustomerUpdate";
import ManagerUpdate from "./Components/ManagerUpdate";
import Profile from "./Components/Profile";
import ManagerStaffRegister from "./Components/ManagerStaffRegister"
import Dashboard from "./Components/Dashboard";
import AccountView from "./Components/AccountView";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import ChangePassword  from "./Components/ChangePassword";

export default function Path() {
  function isAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Deposit" element={<Deposit />} />
        <Route path="/Withdraw" element={<Withdraw />} />
        <Route path="/ListPendingCustomers" element={<ListPendingCustomers/>}/>
        <Route path="/ListManager" element={<ListManager/>}/>
        <Route path="/CustomerAccountView" element={<CustomerAccountView/>}/>
        <Route path="/ListTransaction" element={<ListTransaction/>}/>
        <Route path="/CustomerTransaction" element={<CustomerTransaction/>}/>
        <Route path="/ListStaff" element={<ListStaff/>}/>
        <Route path="/ListApprovedCustomer" element={<ListApprovedCustomer/>}/>
        <Route path="/StaffUpdate/:id?" element={<StaffUpdate />} />
        <Route path="/CustomerUpdate/:id?" element={<CustomerUpdate />} />
        <Route path="/ManagerStaffRegister" element={<ManagerStaffRegister/>}/>
        <Route path="/ManagerUpdate/:id?" element={<ManagerUpdate />} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AccountView" element={<AccountView />}/>
        <Route path="/ForgotPassword" element={<ForgotPassword />}/>
        <Route path="/ResetPassword/:token?" element={<ResetPassword/>} />
        <Route path="/ChangePassword" element={<ChangePassword/>}/>
     
        </Routes>
  );
}