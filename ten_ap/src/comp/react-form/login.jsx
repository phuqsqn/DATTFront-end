// import { red } from "@mui/material/colors";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("red");
  const [isDisableLogin, setIsDisableLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username = ", username);
    console.log("Password = ", password);
  };

  useEffect(() => {
    setIsDisableLogin(username.length === 0 || password.length === 0);
  }, [username, password]);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onBlur={() => {
            console.log("Username onblur");
          }}
          style={{ border: "1px solid gray" }}
          type="text"
          name="username"
          id="username"
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{ border: "1px solid gray" }}
          type="text"
          name="password"
          id="password"
        />

        <br />
        <button
          style={{ border: "1px solid gray" }}
          disabled={isDisableLogin}
          type="submit"
        >
          Login
        </button>

        <br />
        <br />
        <br />

        <br />

        <h1>Màu đang được là: {color}</h1>

        <select
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        >
          <option value="red">red</option>
          <option value="white">white</option>
          <option value="blue">blue</option>
          <option value="green">green</option>
        </select>
      </form>
    </>
  );
};

export default Login;