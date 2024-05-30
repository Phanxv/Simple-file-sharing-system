import { useContext, useState } from 'react'
import { NavLink } from "react-router-dom";
import Logo from "../assets/site_logo.png";
import Hamburger from "../assets/hamburger_white.png"
import { RootContext } from '../pages/Root';

const Navbar = () => {

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const context = useContext(RootContext);

  if (!context) {
    throw new Error("ChildComponent must be used within a RootContextProvider");
  }

  const { user } = context;

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
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
                {user ? <NavLink to="/logout">Log out</NavLink> : <NavLink to="/login">Log in</NavLink>}
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
