import { axiosPrivate } from './intercepter';


const RegisterView = (data) => {
    return axiosPrivate.post('register/', data);
  };
  const loginUser = (data) => {
    return axiosPrivate.post('login/', data);
  };
  const ListStaff = (params) => {
    return axiosPrivate.get('list_staff/', { params });
  };
  
  const ListManager = (data) => {
    return axiosPrivate.get('list-managers/',{ params: data });
  }
  const GetUpdate = (id, data) => {
    return axiosPrivate.get(`update-user/${id}/`, data);
  };
  
  const Update = (id, data) => {
    return axiosPrivate.put(`update-user/${id}/`, data);
  };
  
  const ListCustomer = (params) => {
    return axiosPrivate.get('list-approove-customers/', { params });
  };
  const ChangePassword = async(data) =>{
    return axiosPrivate.post(`change-password/`,data)
  }
  const ListPendingCustomers = (data) => {
    return axiosPrivate.get('list-pending-customer/', data);
  };
  const ApproveCustomer = (id,data) => {
    return axiosPrivate.post(`approve-customer/${id}/`, data);
  };

  const RejectCustomer = (id,data) => {
    return axiosPrivate.post(`reject-customer/${id}/`, data);
  };
  const ListApprovedCustomers = (query) => {
    return axiosPrivate.get('list-approove-customers/', { params: query });
  };
  
  
  const CreateAccount = async (accountData) => {
    return axiosPrivate.post(`create-account/`, accountData);
  };
  const getAccountDetails = (account_id) => {
    return axiosPrivate.get(`customer_account_details/`);
  };

const AccountView = () => {
  return axiosPrivate.get(`customer_account_details/`);
};
const CloseAccount = async (customer_id) => {
  return axiosPrivate.post(`close-account/${customer_id}/`);
};
const ReopenAccount = async (customer_id) => {
  return axiosPrivate.post(`reopen-account/${customer_id}/`);
};
  
const AccountStaffManager = (data) => {
  return axiosPrivate.get(`account-management/`, { params: data });
};

  const deposit= async (account_id,data) => {
    return axiosPrivate.post(`make-transaction/${account_id}/`, data);

  }
  const withdraw= async (account_id,data) => {
    return axiosPrivate.post(`make-transaction/${account_id}/`, data);

  }

  const CustomerTransaction=(customer_id,data)=>{
    return axiosPrivate.get(`customer-transactions/${customer_id}/`,data)
  }

  const Transactions = (query) => {
    return axiosPrivate.get(`list-all-transaction/?query=${query}`);
  };
  
  const CustomerTransactionDownload=(customer_id)=>{
    return axiosPrivate.get(`customer-transactions-download/${customer_id}/`)
  }
  const TransactionDownload=(data)=>{
    return axiosPrivate.get(`download_all_transaction_details/`,data)
  }
  const Profile=(data)=>{
    return axiosPrivate.get(`profile/`,data)
  }

const customerService = {
    RegisterView,
    loginUser,
    Update,
    GetUpdate,
    ListStaff,
    ListManager,
    ListCustomer,
    ListPendingCustomers,
    ApproveCustomer,
    RejectCustomer,
    ListApprovedCustomers,AccountStaffManager,
    Profile,
    ChangePassword
  }
  const accountService={
    CreateAccount,
    AccountView,
    AccountStaffManager,
    CloseAccount,
    ReopenAccount
  }

  const TransactionService={
    deposit,
    withdraw,
    CustomerTransaction,
    Transactions,
    CustomerTransactionDownload,
    TransactionDownload,
    getAccountDetails
  }
export{customerService,accountService,TransactionService}