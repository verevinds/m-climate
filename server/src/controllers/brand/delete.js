module.exports = Brand => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { id } = req.params;

  Brand.deleteOne({ _id: id }, (err, data) => {
    res.send({
      _id: id,
      message: `Deleted brand ${id}`,
      data,
      err,
    });
  });
};
