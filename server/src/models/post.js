const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
