// Signup.jsx

import React from "react";

const Signup = ({ message }) => (
  <div>
    <h1>Signup</h1>
    <form action="/signup" method="post">
      <label>Username:</label>
      <input type="text" name="username" />
      <br />
      <label>Password:</label>
      <input type="password" name="password" />
      <br />
      <input type="submit" value="Signup" />
    </form>
    <p>{message}</p>
  </div>
);

export default Signup;
