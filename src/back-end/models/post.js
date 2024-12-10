import mongoose from 'mongoose';


const PostSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    date: { type: Date, required: true },
    content: { type: String, required: true }
});


export default mongoose.model("Post", PostSchema);