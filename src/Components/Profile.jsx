import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { customerService } from "../urls";
import Dashboard from "./Dashboard";
import "./Profile.css";

function Profile() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const response = await customerService.Profile();
    if (Array.isArray(response.data)) {
      setData(response.data);
    } else {
      setData([response.data]);
    }
  };

  return (
    <Dashboard>
      <h4><center>Profile Information</center></h4>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
          
            <div className="col">
             
            </div>
          </div>

          <div className="row">

            <div className="col-lg-4">
              {data.map((user, index) => (
                <div key={index} className="card mb-4">
                  <div className="card-body text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5.webp"
                      alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} />
                    <h5 className="my-3">{`${user.firstName} ${user.lastName}`}</h5>
                    <p className="text-muted mb-1"><b>{user.userType}</b></p>
                 
                    
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
              
                  {data.map((user, index) => (
                    <div key={index}>
                     
                      <div className="row mb-4">
                        <div className="col-sm-3">
                          <p className="mb-0"><strong>Full Name</strong></p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"><i>{`${user.firstName} ${user.lastName}`}</i></p>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-3">
                          <p className="mb-0"><strong>Email</strong></p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"><i>{user.email}</i></p>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-3">
                          <p className="mb-0"><strong>Phone Number</strong></p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"><i>{user.phoneNumber}</i></p>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-3">
                          <p className="mb-0"><strong>Address</strong></p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"><i>{user.address}</i></p>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-3">
                          <p className="mb-0"><strong>PinCode</strong></p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"><i>{user.pinCode}</i></p>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-3">
                          <p className="mb-0"><strong>Date Of Birth</strong></p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"><i>{user.dob}</i></p>
                        </div>
                      </div>
                     
                    </div>
                  ))}
                </div>
              </div>
              
             

            </div>
          </div>
        </div>
      </section>
    </Dashboard>
  );
}

export default Profile;
