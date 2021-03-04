const mongoose = require('mongoose');

module.exports = Product => async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { body } = req;
  const { brand } = req.body;
  const _id = req.params.id;

  Product.updateOne(
    { _id },
    brand
      ? {
          ...body,
          brand: mongoose.Types.ObjectId(brand),
        }
      : body,
    { new: true },
    (error, product) => {
      if (error) res.status(500).send(error);

      res
        .status(200)
        .send({ product, message: `Товар "${product.name}" обновлен!` });
    },
  );
};
