import React from 'react';

class PostContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editButtonClicked: false
    }

    this.deletePost = this.deletePost.bind(this);
		this.editPost = this.editPost.bind(this);
		this.savePostChanges = this.savePostChanges.bind(this);
  }


  editPost() {
		if (!this.state.editButtonClicked) {
			this.setState({ editButtonClicked: true })
			
		} else {
			this.setState({ editButtonClicked: false })
		}
		
	}

	savePostChanges() {
    let saveChangesContent = document.getElementById("saveTextArea");

    if (saveChangesContent.value !== '') {
      const tArea = {
				id: this.props.postID,
				date: new Date(),
				content: saveChangesContent.value
			}

			// Send a POST request
			fetch(
				"http://localhost:3001/edit-post-by-id",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tArea)
				})
				.then(response => response.json())
				.then(body => {
					if (body.editPostSuccess === true) {
            alert("Successfully edited post with ID " + this.props.postID);
            window.location.reload();
					} else {
						alert("Post unsuccessful!");
					}
				}
				)
    } else {
      alert("Post cannot be empty!");
    }
	}

	deletePost() {
		const postID = { id: this.props.postID };

		fetch('http://localhost:3001/delete-by-id',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(postID)
		})
		.then(response => response.json())
		.then(body => {
			if (body.postDeleted) {
				alert("Successfully deleted post with ID " + this.props.postID);
				window.location.reload();
			} else {
				alert("Delete unsuccessful!");
			}	
		});
	}

  render() {
		// console.log(this.props.userID)
    return (
      <div className='userPosts'>
				<article>
					<div id="firstNamePost">{this.props.firstName}</div>
					{/* <div className='smallerFontPost'>User ID: {this.props.userID}</div> */}
					<div className='smallerFontPost'>Post ID: {this.props.postID}</div>
					<div className='smallerFontPost'>{this.props.date}</div><br />
					<div id="contentPost"> {this.props.content} </div>
				</article><br />
				{this.props.userID == this.props.trueUserID &&
					<> 
						<button id="editPostButton" onClick={this.editPost}>Edit</button>
						<button id="deletePostButton" onClick={() => this.deletePost(this.props.postID)}>Delete</button>
					</>
				}
        {this.state.editButtonClicked && // if the button is clicked
          <div id="editClicked">
            <hr /><br />
            <textarea rows="5" cols="55" placeholder="Edit your post here" id ="saveTextArea" required></textarea>
            <br />
            <button id="saveChangesButton" onClick={this.savePostChanges}>Save Changes</button>
          </div>
        }
      </div>
    )
  }
}

export default PostContent;