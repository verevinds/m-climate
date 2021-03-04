module.exports = Product => (req, res) => {
  Product.find(req.query)
    .populate({ path: 'brand', select: '-__v -_id -createdAt -updatedAt' })
    .select('-__v')
    .exec((error, product) =>
      error ? res.status(500).send(error) : res.status(200).send(product),
    );
};
