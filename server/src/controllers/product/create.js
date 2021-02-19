const mongoose = require('mongoose');

module.exports = Product => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { body } = req;
  const { brandId } = req.body;

  const product = new Product({
    ...body,
    brandId: mongoose.Types.ObjectId(brandId),
  });

  product.save(error =>
    error
      ? res.status(400).send(error)
      : res
          .status(200)
          .send({ product, message: `Товар "${product.name}" добавлен!` }),
  );
};
