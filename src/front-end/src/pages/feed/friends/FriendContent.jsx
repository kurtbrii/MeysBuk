import React, { Component } from 'react';

export default class FriendContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      friendDetails: []
    }

    this.removeUserFromRequests = this.removeUserFromRequests.bind(this);
    this.confirmRequest = this.confirmRequest.bind(this);
    this.postRequest = this.postRequest.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.requests)
    const userID = { userID: this.props.requests }
    fetch('http://localhost:3001/user-request-details',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userID)
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ friendDetails: body })
      });
  }

  postRequest(fetchURL, findUser, successful, unsuccessful) {
    fetch(fetchURL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(findUser)
      })
      .then(response => response.json())
      .then(body => {
        if (body.requestCancelled) {
          if (successful != null) alert(successful);
          window.location.reload();
        } else {
          if (successful != null) alert(unsuccessful);
        }
      });
  }

  removeUserFromRequests(index, successful, unsuccessful) {
    const findUser = {
      yourID: this.props.yourID,
      friendID: this.props.requests[index]
    };
    // alert(this.props.yourID)
    // alert(this.props.requests[index])
    this.postRequest('http://localhost:3001/reject-friend-request', findUser, successful, unsuccessful)
  }
  

  confirmRequest(index) {
    const findUser = {
      yourID: this.props.yourID,
      friendID: this.props.requests[index]
    };
    // alert(this.props.yourID);
    // alert(this.props.requests[index]);
    
    // adds your ID to friend's friends list and vice versa 
    this.postRequest('http://localhost:3001/confirm-friend-request1', findUser, null, null)
    this.postRequest('http://localhost:3001/confirm-friend-request2', findUser, null, null)

    // simply remove the user from the requests array
    this.removeUserFromRequests(index, "Confirm request successful!", "Confirm request successful!");

  }

  render() {
    return (
      <div>
        {
          this.state.friendDetails.map((detail, i) => {
            return (
              <div className='friendContentContainer'>
                <div id="fullNameRequest">{detail.fname} {detail.lname}</div>
                <div className='smallerFontRequest'>User ID: {detail._id}</div>
                <div className='friendContentButton'>
                  <button onClick={() => this.confirmRequest(i)}>Confirm</button>
                  <button onClick={() => this.removeUserFromRequests(i, "Friend request rejected!", "Friend request not rejected!")}>Reject</button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
