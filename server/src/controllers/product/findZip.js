module.exports = Product => (req, res) => {
  try {
    const query = req.query;
    const brand = req.query.brand;

    Product.find({ ...query, inStock: true })
      .populate({
        path: 'brand',
        select: '-_id -__v -createdAt -updatedAt',
      })
      .select('-inStock -city -description -__v -createdAt -updatedAt')
      .exec((error, products) => {
        if (error) res.status(500).send(error);

        let zipProduct = [];
        for (var i = products.length - 1; i >= 0; i--) {
          zipProduct[i] = {
            price: products[i].price,
            priceOld: products[i].priceOld,
            _id: products[i]._id,
            brand: products[i].brand,
            type: products[i].type,
            name: products[i].name,
            image: products[i].images.length ? products[i].images[0].url : '',
          };
        }
        res.status(200).send(zipProduct);
      });
  } catch (e) {
    console.log('e', e);
  }
};
