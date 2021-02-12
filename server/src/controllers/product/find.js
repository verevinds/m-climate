module.exports = (Product) => (req, res) =>
  Product.find()
  .populate({ path: 'brand', select: '-__v -_id -createdAt -updatedAt' })
  .select('-__v')
  .exec((error, brand) =>
    error ? console.error(error) : res.status(200).send(brand)
  );
