module.exports = Product => (req, res) => {
  const city = res.city;
  Product.find({ city })
    .populate({ path: 'brand', select: '-__v -_id -createdAt -updatedAt' })
    .select('-__v')
    .exec((error, product) =>
      error ? console.error(error) : res.status(200).send(product),
    );
};
