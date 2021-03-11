module.exports = Product => (req, res) => {
  try {
    const query = req.query;
    const city = req.query.city;
    const id = req.query._id;

    const orArray = [];

    Object.keys(query).forEach(key => {
      if (
        key === 'city' ||
        key === 'images' ||
        key === 'brand' ||
        key === 'price' ||
        key === 'priceOld' ||
        key === 'description' ||
        key === 'createdAt' ||
        key === 'updatedAt' ||
        key === 'warranty' ||
        key === 'name' ||
        key === '_id' ||
        key === 'type' ||
        key === 'inStock'
      )
        return;

      orArray.push({ [key]: query[key] });
    });
    console.log({ orArray });
    if (!orArray.length) {
      res.status(200).send([]);
      return;
    }
    Product.find({
      _id: { $ne: id },
      inStock: true,
      city,
      type: { $ne: 'Инвенторный' },
      $or: orArray,
    })
      .select('-inStock -city -description -__v -createdAt -updatedAt')
      .exec((error, products) => {
        if (error) res.status(500).send(error);

        if (!Array.isArray(products)) {
          res
            .status(200)
            .send({ products: [], message: 'Похожего товара нет' });
        } else {
          let zipProduct = [];
          for (var i = products.length - 1; i >= 0; i--) {
            zipProduct[i] = {
              price: products[i].price,
              priceOld: products[i].priceOld,
              _id: products[i]._id,
              name: products[i].name,
              image: products[i].images.length ? products[i].images[0].url : '',
            };
          }
          res.status(200).send(zipProduct);
        }
      });
  } catch (e) {
    console.log('e', e);
    res.status(500).send(e);
  }
};
