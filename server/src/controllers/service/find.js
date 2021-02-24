module.exports = Service => (req, res) =>
  Service.find()
    .select('-__v')
    .exec((err, data) =>
      err ? res.status(400).send(err) : res.status(200).send(data),
    );
