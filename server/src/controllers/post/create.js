var mongoose = require('mongoose');

module.exports = (Post) => (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const title = req.body.title;
    const description = req.body.description;
    const user = req.body.user;

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
