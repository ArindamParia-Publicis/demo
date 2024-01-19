import React, { useState, useContext } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../dataContext";

function SignIn() {
  const [userid, setUserId] = useState(0);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setData } = useContext(DataContext);
  // const axios = require('axios');
  const options = {
    method: "POST",
    url: "http://localhost:8081/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: userid,
      password,
    },
  };
  const loginUser = (e) => {
    e.preventDefault();
    axios
      .request(options)
      .then((res1) => {
        if (res1.status === 200) {
          axios({
            method: "get",
            url: "http://localhost:8081/customer/getCustomer",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${res1.data.jwtToken}`,
            },
          })
            .then((res2) => {
              if (res2.status === 200) {
                const dt = {
                  token: `Bearer ${res1.data.jwtToken}`,
                  name: res2.data.name,
                  email: res2.data.email,
                  balance: res2.data.balance,
                  phone: res2.data.phone,
                  accountNumber: res2.data.id,
                };
                setData(dt);
              }
            })
            .catch(() => {
              navigate("/error");
            });
          navigate("/Dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="signIn">
      <form id="signInForm" onSubmit={loginUser}>
        <label htmlFor="aadhaarInput">Aadhaar Number</label>
        <input
          id="aadhaarInput"
          type="number"
          required
          placeholder="Enter your aadhaar number"
          onChange={(e) => setUserId(e.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="password"
          required
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Forgot Password?</p>
        <button type="submit" id="logInBtn">
          LOG IN
        </button>
      </form>
      <p>Don&apos;t you have an account in our bank?</p>
      <Link to="/SignUp">
        <button type="button" id="signUpBtn">
          SIGN UP
        </button>
      </Link>
    </div>
  );
}
export default SignIn;
