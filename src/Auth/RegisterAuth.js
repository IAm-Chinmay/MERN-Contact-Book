import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
function RegisterAuth() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const registerApi = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(`http://localhost:3001/api/user/register-user`, {
          name: username,
          email,
          password,
        })
        .then((res) => {
          dispatch(login(res.data.token));
          navigation("/");
        })
        .catch((er) => {
          console.log(er);
        });
    } catch (er) {
      console.log(er);
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
        onSubmit={registerApi}
      >
        <h3
          style={{
            all: "unset",
            fontSize: "1.6rem",
            fontWeight: "600",
          }}
        >
          Register{" "}
        </h3>
        <input
          type="text"
          style={{
            width: "60%",
            height: "2rem",
            paddingLeft: "1rem",
            fontSize: "1.3rem",
            backgroundColor: "#ebd491",
            borderRadius: "6px",
          }}
          placeholder="Good Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="example@abc.com"
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="mypass"
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
          Register Me
        </button>
        <Link
          style={{
            all: "unset",
            fontSize: "1.2rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
          to={"/"}
        >
          Login
        </Link>
      </form>
    </div>
  );
}

export default RegisterAuth;
