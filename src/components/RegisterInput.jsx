import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

function RegisterInput({ register }) {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [confirmPassword, handleConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and password confirm must be same.");
    } else {
      register({
        name: name,
        email: email,
        password: password,
      });
    }
  };

  return (
    <div className="input-register">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
