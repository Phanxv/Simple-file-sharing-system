import React, { useContext, useEffect, useState } from "react";
import { RootContext } from "../pages/Root";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const context = useContext(RootContext);

  if (!context) {
    throw new Error("ChildComponent must be used within a RootContextProvider");
  }

  const { user, setUser, token, setToken } = context;
  
  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, []);

  interface FormInput {
    username: string;
    password: string;
  }

  interface FormError {
    username_error: string;
    password_error: string;
  }

  const [formData, setFormData] = useState<FormInput>({
    username: "",
    password: "",
  });

  const [formError, setFormError] = useState<FormError>({
    username_error: "",
    password_error: "",
  });

  const [isShowPassCheck, setShowPassCheck] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassCheck(event.target.checked);
  };
  console.log(window.location.hostname)
  const signInUser = async (userData: FormInput) => {
    try {
      const response = await fetch("http://" + window.location.hostname + ":3000/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        console.log(data.token);
        console.log(jwtDecode(data.token));
        setToken(data.token);
        setUser(data.user);
        alert("Logged in");
        navigate("/")
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal Server Error");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInUser(formData);
  };

  return (
    <div className="form-container">
      <div className="form">
        <header>Sign in</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            className="text-input"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <span className="error">
            {formError.username_error && formError.username_error}
          </span>
          <input
            type={isShowPassCheck ? "text" : "password"}
            name="password"
            id="password"
            className="text-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="error">
            {formError.password_error && formError.password_error}
          </span>
          <div style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              name="showPass"
              id="showPass"
              className="check-input"
              onChange={handleCheck}
            />
            <span className="text-span">Show password</span>
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
