module.exports = Product => (req, res) => {
  try {
    const query = req.query;
    const brand = req.query.brand;

    Product.find(query)
      .populate({
        path: 'brand',
        select: '-__v -createdAt -updatedAt',
      })
      .select('-__v')
      .exec((error, product) =>
        error ? res.status(500).send(error) : res.status(200).send(product),
      );
  } catch (e) {
    console.log('e', e);
  }
};
