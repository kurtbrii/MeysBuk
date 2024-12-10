import React from 'react';
import './form.css'

class Form extends React.Component {

	constructor(props) {
		super(props)

		this.addPost = this.addPost.bind(this);
	}

	addPost(e) {
		let textArea = document.getElementById("t-area")

		if (textArea.value === '') {
			alert("Post cannot be empty!");
			e.preventDefault();
		} else {
			const tArea = {
				firstName: localStorage.getItem('fname'),
				// lastName: localStorage.getItem('lname'),
				id: this.props.userID,
				date: new Date(),
				content: textArea.value
			}
			
			// Send a POST request
			fetch(
				"http://localhost:3001/create-post",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tArea)
				})
				.then(response => response.json())
				.then(body => {
					if (body.postSuccess == true) {
						alert("Post successful!");
						window.location.href = "/feed?id=" + this.props.userID;
					} else {
						alert("Post unsuccessful!");
					}
				}
				)
			}
	}

	render() { // renders the forms (top of the content)
		return (
			<div>
				<form id='postForm'>
					<textarea id='t-area' rows="5" cols="70" placeholder="What's on Your Mind?" required></textarea>

					<div className='buttons'>
						<button className='postNow' id='postNowButton' onClick={this.addPost}>Post Now</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Form;