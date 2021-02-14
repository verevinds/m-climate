module.exports = Product => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const _id = req.params.id;

  Product.deleteOne({ _id }, (err, data) => {
    res.send({
      _id,
      message: `Deleted product ${_id}`,
      data,
      err,
    });
  });
};
