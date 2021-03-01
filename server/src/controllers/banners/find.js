module.exports = Brand => (req, res) =>
  Brand.find(req.query)
    .select('-__v')
    .exec((error, brand) =>
      error ? console.error(error) : res.status(200).send(brand),
    );
