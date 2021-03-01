module.exports = Product => (req, res) => {
  const _id = req.params.id;

  if (!_id)
    res.status(400).send({ message: 'Не указан id запрашиваемого товара' });

  Product.findOne({ _id })
    .populate({ path: 'brand', select: '-__v -_id -createdAt -updatedAt' })
    .select('-__v -createdAt -updatedAt')
    .exec((error, product) =>
      error ? console.error(error) : res.status(200).send(product),
    );
};
