import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import axios from "axios";

function LoginAuth() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginApi = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(`http://localhost:3001/api/user/login-user`, {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data.token);
          dispatch(login(res.data.token));
        });
    } catch (er) {
      alert(er.message);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          backgroundColor: "#e8e4d8",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "50%",
          borderRadius: "15px",
        }}
        onSubmit={loginApi}
      >
        <h3
          style={{
            all: "unset",
            fontSize: "1.6rem",
            fontWeight: "600",
          }}
        >
          Login{" "}
        </h3>
        <input
          type="email"
          style={{
            width: "60%",
            height: "2rem",
            paddingLeft: "1rem",
            fontSize: "1.3rem",
            backgroundColor: "#ebd491",
            borderRadius: "6px",
          }}
          placeholder="example@abc.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          style={{
            width: "60%",
            height: "2rem",
            paddingLeft: "1rem",
            fontSize: "1.3rem",
            backgroundColor: "#ebd491",
            borderRadius: "6px",
          }}
          placeholder="mypass"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          style={{
            width: "60%",
            height: "2rem",
            paddingLeft: "1rem",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          type="submit"
        >
          Login
        </button>
        <Link
          style={{
            all: "unset",
            fontSize: "1.2rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
          to={"/register"}
        >
          Register
        </Link>
      </form>
    </div>
  );
}

export default LoginAuth;
