// Login.jsx

import React from "react";

const Login = ({ message }) => (
  <div>
    <h1>Login</h1>
    <form action="/login" method="post">
      <label>Username:</label>
      <input type="text" name="username" />
      <br />
      <label>Password:</label>
      <input type="password" name="password" />
      <br />
      <input type="submit" value="Login" />
    </form>
    <p>{message}</p>
  </div>
);

export default Login;
// This component receives a message prop and displays it to the user, along with a form for entering the username and password. When the form is submitted, it sends a POST request to the /login route, which will handle the login process.




