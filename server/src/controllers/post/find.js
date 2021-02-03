module.exports = (Post) => (req, res) => {
    Post.find({})
        .populate('user')
        .exec(function (err, post) {
            if (err) return console.log(err);
            res.send(post);
        });
};
