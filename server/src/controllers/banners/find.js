module.exports = Brand => (req, res) =>
  Brand.find()
    .select('-__v')
    .exec((error, brand) =>
      error ? console.error(error) : res.status(200).send(brand),
    );
