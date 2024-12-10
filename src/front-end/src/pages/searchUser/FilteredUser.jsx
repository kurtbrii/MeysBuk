import React from 'react';

class FilteredUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addButtonClicked: false
    }

    this.addButton = this.addButton.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.unfriendButton = this.unfriendButton.bind(this);
    this.postRequestWithBody = this.postRequestWithBody.bind(this);
    this.postRequestNoBody = this.postRequestNoBody.bind(this);
  }

  postRequestWithBody(fetchURL, findUser, successful, unsuccessful, bodyContent) {
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
        bodyContent ? bodyContent = body.friendAdded : bodyContent = body.requestCancelled
        if (bodyContent) {
          alert(successful);
          window.location.reload();
        } else {
          alert(unsuccessful);
        }
      });
  }

  postRequestNoBody(fetchURL, findUser) {
    fetch(fetchURL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(findUser)
      })
      .then(response => response.json())
  }

  addButton() {
    // subject to changes if cancel request is to be implemented
    this.setState({ addButtonClicked: true })
    // alert("Friend request sent to " + this.props.id);

    // request proper
    const findUser = {
      yourID: this.props.yourID,
      friendID: this.props.friendID
    };

    this.postRequestWithBody('http://localhost:3001/add-user-by-id', findUser, "Friend request sent to " + this.props.firstName, "Friend Request unsuccessful!", true)

    // alert(this.props.yourID);
    // alert(this.props.friendID);
  }

  cancelButton() {
    // subject to changes if cancel request is to be implemented
    this.setState({ addButtonClicked: false })
    const findUser = {
      yourID: this.props.yourID,
      friendID: this.props.friendID
    };

    this.postRequestWithBody('http://localhost:3001/cancel-friend-request', findUser, "Request cancelled successfully", "Cancel request unsuccessful!", false)

    // alert(this.props.yourID);
    // alert(this.props.friendID);
  }

  unfriendButton() {
    const findUser = {
      yourID: this.props.yourID,
      friendID: this.props.friendID
    };

    this.postRequestNoBody('http://localhost:3001/remove-friend1', findUser)
    this.postRequestNoBody('http://localhost:3001/remove-friend2', findUser)

    window.location.reload();
  }

  render() {
    return (
      <div className='filteredUsers'>
        <article>
          <div id="firstNamePost">{this.props.firstName} {this.props.lastName}</div>
          <div className='smallerFontPost'>User ID: {this.props.friendID}</div>
          <div className='smallerFontPost'>{this.props.email}</div><br />
        </article>
        {
          (this.props.friends).includes(this.props.yourID)
            ? <button id="alreadyFriends" onClick={this.unfriendButton}>Unfriend</button>
            :
            (this.state.addButtonClicked || (this.props.requests).includes(this.props.yourID))
              ? <button id="cancelFriendRequest" onClick={this.cancelButton}>Cancel Request</button>
              : <button id="addFriendButton" onClick={this.addButton}>Add Friend</button>
        }
      </div>
    )
  }
}

export default FilteredUser;