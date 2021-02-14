module.exports = Post => (req, res) => {
  Post.find({})
    .populate({ path: 'user', select: '-__v -_id' })
    .select('-__v')
    .exec((err, post) => {
      if (err) return console.error(err);
      res.send(post);
    });
};
