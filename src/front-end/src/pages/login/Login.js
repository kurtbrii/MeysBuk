import React, { Component } from "react";
import "./login.css";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signUP = this.login.bind(this);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null,
    };
  }

  signUpRedirect(e) {
    e.preventDefault();
    window.location.href = "http://localhost:3000/sign-up";
  }

  login(e) {
    e.preventDefault();

    const credentials = {
      email: document.getElementById("l-email").value,
      password: document.getElementById("l-password").value,
    };

    // Send a POST request
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((body) => {
        if (!body.success) {
          alert("Failed to log in");
        } else {
          // successful log in. store the token as a cookie
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3001/",
            age: 60 * 60,
            sameSite: "lax",
          });

          localStorage.setItem("fname", body.fname);
          localStorage.setItem("id", body.id);

          alert("Successfully logged in");
          const form = document.getElementById("myForm");
          form.submit();
          window.location.href = "http://localhost:3000/feed?id=" + body.id;
        }
      });
  }

  render() {
    if (!this.state.checkedIfLoggedIn) {
      return (
        <div className="loginContainer">
          <div className="loginElements" id="fbLogin">
            MeysBuk <span id="loginWord">Login</span>
          </div>
          <br />
          <div className="loginElements">
            <form id="myForm">
              <input
                type="text"
                id="l-email"
                placeholder="Email"
                className="loginInputs"
              />
              &nbsp;
              <input
                type="password"
                id="l-password"
                placeholder="Password"
                className="loginInputs"
              />
              &nbsp;
              <button id="loginButton" onClick={this.login}>
                Log In
              </button>
              &nbsp;
              <button id="signUpButton" onClick={this.signUpRedirect}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return <Navigate to="/feed" />;
    }
  }
}
