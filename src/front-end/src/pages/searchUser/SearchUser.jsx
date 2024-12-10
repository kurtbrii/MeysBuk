import React from "react";
import "./searchuser.css";

import NavBar from "../feed/navbar/NavBar";
import FilteredUser from "./FilteredUser";

class SearchUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedUsers: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/search-by-name")
      .then((response) => response.json())
      .then((body) => {
        this.setState({ searchedUsers: body });
      });
  }

  render() {
    const queryString = window.location.search; // for the user's fname or lname which appears in the url
    const urlParams = new URLSearchParams(queryString.split("+").join(" "));
    const name = urlParams.get("name");

    const newQuery = window.location.search; // for the user's fname or lname which appears in the url
    const urlParamsID = new URLSearchParams(newQuery.split("+").join(" "));
    const id = urlParamsID.get("id");

    return (
      <div className="overallContainer">
        <div className="feedContainer">
          <div className="navbar">
            <NavBar userID={id} filteredUser={name} />
          </div>
        </div>

        <div className="feedContainer">
          <span id="searchedResults">Searched Results for "{name}" :</span>
          <div className="searchUserContainer">
            {this.state.searchedUsers.map((user, index) => {
              // alert(user.friends)
              // console.log(user.friends)
              // console.log(user.requests)
              return (
                // each user is a component
                <div className="allUsersSearched" key={index}>
                  {user._id !== id && // since the user id of the current user logged in is in the parameter, we can use it to filter
                    // searches such that user cannot add himself as Facebook friend
                    (user.fname.toLowerCase().includes(name.toLowerCase()) ||
                      user.lname
                        .toLowerCase()
                        .includes(name.toLowerCase())) && (
                      <FilteredUser
                        yourID={id}
                        friendID={user._id}
                        firstName={user.fname}
                        lastName={user.lname}
                        email={user.email}
                        requests={user.requests}
                        friends={user.friends}
                        key={index}
                      />
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchUser;
