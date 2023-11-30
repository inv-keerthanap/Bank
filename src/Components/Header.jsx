import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { faUser, faUserCog, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Header({ userName }) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header>
      <div className="navbar d-flex justify-content-end">
        <Dropdown show={dropdownVisible} onToggle={toggleDropdown}>
          <Dropdown.Toggle as="a" className="nav-link dropdown-toggle" id="navbarDropdown">
          <FontAwesomeIcon icon={faUser}/>
            {userName && <span className="username">{userName}</span>}
           
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/Profile" data-testid="profile">
            <FontAwesomeIcon icon={faUser}/>Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/ChangePassword" data-testid="change">
            <FontAwesomeIcon icon={faKey}/>
              Change Password</Dropdown.Item>
            <Dropdown.Item as={Link} to="/"  data-testid="logout" onClick={handleLogout}>
              <FontAwesomeIcon icon={faUserCog}/>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
