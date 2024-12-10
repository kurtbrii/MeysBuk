import React from 'react';
import './navbar.css';
import Cookies from "universal-cookie";

// onClick="enterHover"
import logo from './pics/logo.png'
import home from "./pics/home.png"
import netflix from "./pics/netflix.png"
// import enter from './pics/enter.png'
import market from "./pics/market.png"
import gaming from "./pics/gaming.png"
import messenger from "./pics/messenger.png"
import notification from "./pics/notification.png"
import down from "./pics/down.png"

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null,
      filterName: ""
    }

    this.findUser = this.findUser.bind(this);
    this.logout = this.logout.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  findUser(e) {
    if (e.key === "Enter") {
      const searchUser = document.getElementById('searchUserField');
      if (searchUser.value === '') {
        alert('This field cannot be empty!');
      } else {
        alert("Finding user...");
        window.location.href="http://localhost:3000/search-user?id=" + this.props.userID + "&name=" + searchUser.value.split(" ").join("+");
      }
    }
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
    window.location.href='/login'
  }

  goHome() {
    window.location.href = "http://localhost:3000/feed?id="+this.props.userID
  }

  render() {
      return (
        <div className='navBarContainer'>
          <section className="fnav">
            <a onClick={this.goHome}><img src={logo} alt="logo" width="50px" height="50px"
              className="left-button" /></a>
            <input onKeyPress={this.findUser} type="text" placeholder="Search here ..." className="left-button search-bar" id="searchUserField" defaultValue={this.props.filteredUser} />
          </section>

          <section className="snav">
            <a href="https://www.netflix.com/"><img src={netflix} alt="netflix" width="30px" height="30px"
              className="mid-button" /></a>
            <a href="https://shopee.ph/"><img src={market} alt="marketplace" width="30px" height="30px"
              className="mid-button" /></a>
            <a href="https://www.y8.com/"><img src={gaming} alt="gaming" width="30px" height="30px"
              className="mid-button" /></a>
          </section>

          <section className="tnav">
            <img src={messenger} alt="messenger" width="40px" height="40px" className="right-button" />
            <img src={notification} alt="notification" width="40px" height="40px" className="right-button" />
            <img src={down} alt="arrow down" width="40px" height="40px" className="right-button" />
            <button id="logoutButton" onClick={this.logout}>Log Out</button>
          </section>
        </div>
      )
    }
  }

export default NavBar;