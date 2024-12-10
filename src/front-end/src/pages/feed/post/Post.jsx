import React from 'react';
import PostContent from './PostContent';
import './post.css';


class Post extends React.Component { // for POST
	constructor(props) {
		super(props)

		this.state = {
			posts: [],
			friends: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/post-all')
			.then(response => response.json())
			.then(body => {
				this.setState({ posts: body })
			});

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
				this.setState({ friends: body })
			});

	}

	render() {
		let newArray = [];
		// alert(this.props.id)
		return (
			<div className='post-container'>
				<h2 id='postWord'>POSTS</h2>
				{
					this.state.friends.map((friend, i) => {
						newArray = friend.friends
						// console.log(friend.friends)
					})
				}
				{
					this.state.posts.map((post, i) => {
						return ( // each post is a component
							<>
								{
									(this.props.userID == post.userID || newArray.includes(post.userID)) &&
									<PostContent userID={this.props.userID} trueUserID={post.userID} postID={post._id} firstName={post.firstName} date={post.date} content={post.content} key={i} />
								}
							</>
						)
					})
				}
			</div>
		)
	}
}

export default Post