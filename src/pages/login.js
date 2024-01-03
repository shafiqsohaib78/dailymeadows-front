import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Footer from "../components/footers/homeFooter";
import MainNavbar from "../components/navbars/mainNavbar";
import "../css/login.css";
import { login } from "../Actions/CounterAction";
import Swal from "sweetalert2";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (isAuthenticated === true) {
      console.log("true");
      window.location.href = "/";
    }
  });
  const handleEmailChange = async (event) => {
    // console.log("email updating");
    setEmail(
      event.target.value && event.target.value && event.target.value
        ? event.target.value
        : ""
    );
  };
  const handlePasswordChange = async (event) => {
    // console.log("password updating");
    setPassword(
      event.target.value && event.target.value && event.target.value
        ? event.target.value
        : ""
    );
  };
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.removeItem("latestAction");
    localStorage.removeItem("loginStatus");
    console.log("submit called");
    if (email.length > 0 && password.length > 0) {
      console.log("if");
      const data = {
        email: email,
        password: password,
      };
      dispatch(login(data));
    } else {
      console.log("else");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Email and Password is required!",
      });
    }
  };

  return (
    <React.Fragment>
      <MainNavbar />
      <main style={{ minHeight: "70vh" }}>
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <div>
            <form className="login-form">
              <div className="form-inputs-container">
                <div className="form-group ">
                  <input type="text" style={{ display: "none" }} />
                  <input
                    type="email"
                    value={email}
                    id="email"
                    name="email"
                    onChange={(e) => handleEmailChange(e)}
                    className="form-control form-email"
                    placeholder="Email"
                    // autoComplete="off"
                  ></input>
                </div>
                <div className="form-group ">
                  <input type="text" style={{ display: "none" }} />
                  <input
                    type="password"
                    value={password}
                    id="password"
                    name="password"
                    onChange={(e) => handlePasswordChange(e)}
                    className="form-control form-email"
                    placeholder="Password"
                    // autoComplete="off"
                  ></input>
                </div>
              </div>
            </form>
            <button
              className="login-button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin(e);
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
