import React, { Component } from "react";
import './feed.css'
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

import NavBar from './navbar/NavBar';
import Form from "./form/Form";
import Post from "./post/Post";
import Friends from './friends/Friends';
import Ads from "./ads/Ads";


export default class Feed extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // Send POST request to check if user is logged in
    fetch("http://localhost:3001/checkifloggedin",
      {
        method: "POST",
        credentials: "include"
      })
      .then(response => response.json())
      .then(body => {
        if (body.isLoggedIn) {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: true, fname: localStorage.getItem('fname'), id: localStorage.getItem('id') });
        } else {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: false });
        }
      });
  }

  logout(e) {
    e.preventDefault();

    // Delete cookie with authToken
    const cookies = new Cookies();
    cookies.remove("authToken");

    // Delete username in local storage
    localStorage.removeItem("fname");
    localStorage.removeItem("id");

    this.setState({ isLoggedIn: false });
  }

  render() {
    if (!this.state.checkedIfLoggedIn) {
      // delay redirect/render
      return (<div></div>)
    }

    else {
      if (this.state.isLoggedIn) {
        // render the page
        return (

          <div className="overallContainer">
            <div className="feedContainer">
              <div className="navbar">
                <NavBar userID={this.state.id} />
              </div>
            </div>

            <div className='newContainer'>
              <div className='lsidebar'>
                <Friends userID={this.state.id}/>
              </div>

              <div className='middle'>
                <span>Welcome to your feed, <span id='boldName'>{this.state.fname}</span>!</span>
                <div className='all-contents'>
                  <br /><br />
                  <Form userID={this.state.id} /><br />
                  <hr />
                  
                  <Post userID={this.state.id} />
                </div>
                <br /><br />
              </div>

              <div className='rsidebar'>
                  <Ads />
              </div>
            </div>
          </div>
        )
      }

      else {
        // redirect
        return <Navigate to="/login" />
      }
    }
  }
}