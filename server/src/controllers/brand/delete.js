module.exports = (Brand) => (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const _id = req.params.id;

    Brand.deleteOne({ _id }, function (err, data) {
      res.send({
        _id,
        message:`Deleted brand ${_id}`,
        data,
        err
      })
    });
};
