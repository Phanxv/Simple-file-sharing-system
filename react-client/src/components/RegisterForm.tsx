import React, { useState } from "react";

const RegisterForm = () => {
  interface FormInput {
    username: string;
    password: string;
    repassword: string;
  }

  interface FormError {
    username_error: string;
    password_error: string;
    repassword_error: string;
  }

  const [formData, setFormData] = useState<FormInput>({
    username: "",
    password: "",
    repassword: "",
  });

  const [formError, setFormError] = useState<FormError>({
    username_error: "",
    password_error: "",
    repassword_error: "",
  });

  const [isShowPassCheck, setShowPassCheck] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === "username" && value.length < 5) {
      setFormError((prevError) => ({
        ...prevError,
        username_error: "Username must be at least 5 characters long",
      }));
    } else {
      setFormError((prevError) => ({
        ...prevError,
        username_error: "",
      }));
    }

    if (name === "password" && value.length > 0 && value.length < 8) {
      setFormError((prevError) => ({
        ...prevError,
        password_error: "Password must be at least 8 characters long",
      }));
    } else {
      setFormError((prevError) => ({
        ...prevError,
        password_error: "",
      }));
    }

    if (name === "repassword" && value !== formData.password) {
      setFormError((prevError) => ({
        ...prevError,
        repassword_error: "Passwords do not match",
      }));
    } else {
      setFormError((prevError) => ({
        ...prevError,
        repassword_error: "",
      }));
    }
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setShowPassCheck(event.target.checked);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(
      `username: ${formData.username}, password: ${formData.password}, repassword: ${formData.repassword}`
    );
  };

  console.log(formData);
  console.log(formError);
  console.log(isShowPassCheck);

  return (
    <div className="form-container">
      <div className="registration form">
        <header>Sign up</header>
        <form action="/register" onSubmit={handleSubmit}>
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
          <input
            type={isShowPassCheck ? "text" : "password"}
            name="repassword"
            id="repassword"
            className="text-input"
            placeholder="Enter your password again"
            value={formData.repassword}
            onChange={handleChange}
            required
          />
          <span className="error">
            {formError.repassword_error && formError.repassword_error}
          </span>
          <div style={{marginTop: "10px"}}>
            <input type="checkbox" name="showPass" id="showPass" className="check-input" onChange={handleCheck}/>
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

export default RegisterForm;
