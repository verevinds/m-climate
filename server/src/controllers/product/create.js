const mongoose = require('mongoose');

module.exports = Product => async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { body } = req;
  const { brand } = req.body;

  const product = new Product({
    ...body,
    brand: mongoose.Types.ObjectId(brand),
  });

  const newProduct = await product.save();

  Product.findOne({ _id: newProduct._id })
    .populate({ path: 'brand', select: '-__v -_id -createdAt -updatedAt' })
    .select('-__v')
    .exec((error, product) =>
      error
        ? console.error(error)
        : res
            .status(200)
            .send({ product, message: `Товар "${product.name}" добавлен!` }),
    );
};
