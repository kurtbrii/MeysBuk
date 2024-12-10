import React from 'react';
import FriendContent from './FriendContent';
import './friends.css';

class Friends extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      friendRequests: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/all-requests',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID: this.props.userID })
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ friendRequests: body })
      });
      
  }

  render() {
    return (
      <div className='friendsContainer'>
        <h3>Friend Requests</h3>
        <div>
          {
            this.state.friendRequests.map((request, i) => {
              return (
                <FriendContent yourID={this.props.userID} requests={request.requests} friends={request.friends} key={i} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Friends;