// Users.jsx

import React from "react";

const Users = ({ users }) => (
  <div>
    <h1>Users</h1>
    <ul>
      {users.map(user => (
        <li key={user._id}>
          <p>Username: {user.username}</p>
          <p>Is disabled: {user.isDisabled}</p>
          <a href={`/users/${user._id}/edit`}>Edit</a>
          <form action={`/users/${user._id}/remove`} method="post">
            <input type="submit" value="Remove" />
          </form>
        </li>
      ))}
    </ul>
    <a href="/users/add">Add</a>
  </div>
);

export default Users;
