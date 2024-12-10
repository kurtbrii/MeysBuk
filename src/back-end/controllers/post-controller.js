import Post from '../models/post.js';


const createPost = (req, res) => {
	const newPost = new Post({
		firstName: req.body.firstName,
		userID: req.body.id,
		date: req.body.date,	
		content: req.body.content
	});

	newPost.save((err) => {
		if (!err) { res.send({ postSuccess: true }); console.log(newPost); }
		else { res.send({ postSuccess: false }) }
	})
}

const postAll = (req, res) => {

  Post.find({ }, (err, posts) => {
    if (!err) { res.send(posts); }
  }).sort([['date', -1]])
}

const editPostById = (req, res) => {
	Post.findOneAndUpdate({ _id: req.body.id }, { content: req.body.content, date: req.body.date }, (err, post) => {
		if (err) return res.send({ editPostSuccess: false });
		return res.send({ editPostSuccess: true });
	});
}

const deleteById = async (req, res) => {
	await Post.findOneAndDelete({ _id: req.body.id }, (err, post) => {
    if (!err && post) {
      res.send({ postDeleted: true })
    }
    else {
      res.send({ postDeleted: false })
    }
  })
}

export { createPost, postAll, editPostById, deleteById }
