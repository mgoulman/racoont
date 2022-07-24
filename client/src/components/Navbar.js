import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { UidContext } from "../components/AppContext"
import Logout from "./log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  
  return (
  <nav>
    <div className="nav-container">
      <NavLink exact="true" to="/">
        <div className="logo">
          <img src="/img/icon.png" alt="icon" />
          <h3>Raccoont</h3>
        </div>
      </NavLink>
    {uid ? (
      <ul>
        <li></li>
        <li className="welcome">
          <NavLink exact="true" to="profile">
            <h3>Bienvenue {userData.pseudo}</h3>
          </NavLink>
        </li>
        <Logout />
      </ul>
    ) : (
      <ul>
        <li></li>
        <li>
          <NavLink exact="true" to="/profile">
            <img src="./img/icons/login.svg" alt="login"/>
          </NavLink>
        </li>
      </ul>
    )}
    </div>
  </nav>
  
)};

export default Navbar;
