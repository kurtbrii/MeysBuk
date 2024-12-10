import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./signup.css";

const submitForm = (state) => {
  // when sign up button is clicked
  // get elements
  const fnamePrompt = document.getElementById("fNamePrompt");
  const lnamePrompt = document.getElementById("lNamePrompt");
  const emailPrompt = document.getElementById("emailPrompt");
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // for email

  let fnameValid = true;
  let lnameValid = true;
  let emailValid = true;
  let pwValid = true;

  // conditions needed to be evaluated in order to submit form.
  // if met, submit. If not, change respective validation to false
  // change innerHTML (prompt) depending on the validation
  state.fNameValue === ""
    ? (fnamePrompt.innerHTML = "Invalid first name")
    : (fnamePrompt.innerHTML = "");
  state.fNameValue === "" ? (fnameValid = false) : (fnameValid = true);

  state.lNameValue === ""
    ? (lnamePrompt.innerHTML = "Invalid last name")
    : (lnamePrompt.innerHTML = "");
  state.lNameValue === "" ? (lnameValid = false) : (lnameValid = true);

  !emailRegex.test(state.emailValue)
    ? (emailPrompt.innerHTML = "Invalid email")
    : (emailPrompt.innerHTML = "");
  !emailRegex.test(state.emailValue)
    ? (emailValid = false)
    : (emailValid = true);

  state.enterPwAgain === state.pwValue &&
  state.enterPwAgain !== "" &&
  state.pwValue !== "" &&
  state.pwValidated
    ? (pwValid = true)
    : (pwValid = false);

  if (fnameValid && lnameValid && emailValid && pwValid) {
    const user = {
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    // send a POST request to localhost:3001/signup
    fetch("http://localhost:3001/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          alert("Successfully saved user");
          const myForm = document.getElementById("signUpForm");

          myForm.submit();
          window.location.href = "http://localhost:3000/feed";
        } else {
          alert("Failed to save user");
        }
      });
  } else {
    alert("You must finish signing up before submitting"); // if conditions are met
  }
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      fNameValue: "",
      lNameValue: "",
      emailValue: "",
      pwValue: "",

      showEnterAgain: true,
      enterPwAgain: "",

      pwValidated: false,
    };

    // change handlers
    this.fNameChangeHandler = this.fNameChangeHandler.bind(this);
    this.lNameChangeHandler = this.lNameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.pwChangeHandler = this.pwChangeHandler.bind(this);
    this.pwaChangeHandler = this.pwaChangeHandler.bind(this);
  }

  fNameChangeHandler(e) {
    this.setState({ fNameValue: e.target.value });
  }

  lNameChangeHandler(e) {
    this.setState({ lNameValue: e.target.value });
  }

  emailChangeHandler(e) {
    this.setState({ emailValue: e.target.value });
  }

  pwChangeHandler(e) {
    const value = e.target.value;
    this.setState({ pwValue: value });

    this.setState({ pwValidated: true });
    this.setState({ pwValid: true });
    if (value.length >= 8) {
      // as per specification, length of pw should be at least 8
      var hasNumber = false;
      var hasLowerCase = false;
      var hasUpperCase = false;

      // loop that checks per character input if the value has a number, lowercase, and uppercase.
      const number = new RegExp("[0-9]");
      const lowercase = new RegExp("[a-z]");
      const uppercase = new RegExp("[A-Z]");
      for (let i = 0; i < value.length; i++) {
        if (lowercase.test(value[i])) {
          hasNumber = true;
        } else if (uppercase.test(value[i])) {
          hasLowerCase = true;
        } else if (number.test(value[i])) {
          hasUpperCase = true;
        }
      }
      // console.log(hasNumber)
      // console.log(hasLowerCase)
      // console.log(hasUpperCase)
      if (hasNumber && hasLowerCase && hasUpperCase) {
        // if conditions are met
        this.setState({ pwValidated: true });
      } else {
        // otherwise
        this.setState({ pwValidated: false });
      }
    } else {
      this.setState({ pwValidated: false });
    }
  }

  pwaChangeHandler(e) {
    this.setState({ enterPwAgain: e.target.value });
  }

  render() {
    if (!this.state.checkedIfLoggedIn) {
      return (
        <div className="loginContainer">
          <div className="loginElements" id="fbLogin">
            Sign <span id="loginWord">Up</span>
          </div>
          <br />
          <form id="signUpForm">
            <div className="signUpItems">
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="First Name"
                required
                value={this.state.fNameValue}
                onChange={this.fNameChangeHandler}
              />
              <span id="fNamePrompt" className="errors"></span>
            </div>
            <div className="signUpItems">
              <input
                type="text"
                name="lname"
                id="lname"
                placeholder="Last Name"
                required
                value={this.state.lNameValue}
                onChange={this.lNameChangeHandler}
              />
              <span id="lNamePrompt" className="errors"></span>
            </div>
            <div className="signUpItems">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                value={this.state.emailValue}
                onChange={this.emailChangeHandler}
              />
              <span id="emailPrompt" className="errors"></span>
            </div>
            <div className="signUpItems">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
                value={this.state.pwValue}
                onChange={this.pwChangeHandler}
              />
              {/* if pw is not empty, show re-enter password. toggles re-enter if the former went back to empty */}
              {this.state.pwValue === ""
                ? (this.state.showEnterAgain = false)
                : (this.state.showEnterAgain = true)}
              <span className="errors">
                {this.state.pwValidated || this.state.pwValue === ""
                  ? ""
                  : "Invalid password"}
              </span>{" "}
              {/* live changes */}
            </div>
            {
              // for re-enter password
              this.state.showEnterAgain && ( // nakita ko lang po sa net maam 😊 https://www.nicesnippets.com/blog/how-to-hide-and-show-multiple-div-in-react
                <div className="signUpItems">
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    placeholder="Enter Password Again"
                    required
                    value={this.state.enterPwAgain}
                    onChange={this.pwaChangeHandler}
                  />
                  <span className="errors">
                    {this.state.enterPwAgain === this.state.pwValue ||
                    this.state.enterPwAgain === ""
                      ? ""
                      : "Passwords do not match!"}
                  </span>{" "}
                  {/* live changes */}
                </div>
              )
            }
            <button
              className="signUpItems"
              id="signUpButton"
              type="button"
              onClick={() => {
                submitForm(this.state);
              }}
            >
              Sign Up
            </button>{" "}
            {/* calls submitForm function with the state as parameter */}
          </form>
        </div>
      );
    } else {
      return <Navigate to="/feed" />;
    }
  }
}
