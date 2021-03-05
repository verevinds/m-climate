module.exports = Product => (req, res) => {
  const _id = req.params.id;

  if (!_id)
    res.status(400).send({ message: 'Не указан id запрашиваемого товара' });

  Product.findOne({ ...req.query, _id })
    .populate({ path: 'brand', select: '-__v -createdAt -updatedAt' })
    .select('-__v -createdAt -updatedAt')
    .exec((error, product) =>
      error
        ? res.status(400).send({ product, message: 'Товар не найден' })
        : res.status(200).send(product),
    );
};
