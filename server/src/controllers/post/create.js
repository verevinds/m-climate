const mongoose = require('mongoose');

module.exports = Post => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { title } = req.body;
  const { description } = req.body;
  const { user } = req.body;

  const post = new Post({
    title,
    description,
    user: mongoose.Types.ObjectId(user),
  });

  post.save(function (err) {
    if (err) return console.log(err);
    res.send(post);
  });
};
