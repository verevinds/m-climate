module.exports = Product => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const _id = req.params.id;

  Product.findByIdAndDelete({ _id }, (err, data) =>
    err
      ? res.status(400).send(err)
      : res.status(200).send({
          _id,
          message: `Товар "${data.name}" удалён!`,
          data,
        }),
  );
};
