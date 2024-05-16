import { useState } from 'react'
import { NavLink } from "react-router-dom";
import Logo from "../assets/site_logo.png";
import Hamburger from "../assets/hamburger_white.png"
const Navbar = () => {

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <img src={Hamburger} alt="menu icon" />
          </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/upload">Upload</NavLink>
              </li>
              <li>
                <NavLink to="/login">Log in</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
