import React, { useContext } from "react";
import { RootContext } from "./Root";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const context = useContext(RootContext);
  const navigate = useNavigate();
  if (!context) throw "Context error";
  const { user, setUser, setToken } = context;
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/signout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        setUser(null);
        setToken(null);
        alert("Logged out");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal Server Error");
    }
  };
  
  return (
    <div className="upload-form-container">
      <div className="registration form">
        <p>Log out of user</p>
        <p>{user}?</p>
        <button className="button" onClick={handleLogout}>
          Yes
        </button>
        <button
          className="button-inv"
          onClick={() => {
            navigate(-1);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Logout;
