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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(
      `username: ${formData.username}, password: ${formData.password}, repassword: ${formData.repassword}`
    );
  };

  console.log(formData);
  console.log(formError);

  return (
    <div className="form-container">
      <div className="registration form">
        <header>Sign up</header>
        <form action="/register" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <span className="error">
            {formError.username_error && formError.username_error}
          </span>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="error">
            {formError.password_error && formError.password_error}
          </span>
          <input
            type="text"
            name="repassword"
            id="repassword"
            placeholder="Enter your password again"
            value={formData.repassword}
            onChange={handleChange}
            required
          />
          <span className="error">
            {formError.repassword_error && formError.repassword_error}
          </span>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
