module.exports = Service => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const _id = req.params.id;

  Service.findByIdAndDelete({ _id }, (err, data) =>
    err
      ? res.status(400).send(err)
      : res.status(200).send({
          _id,
          message: `УСлуга "${data.name}" удалёна!`,
          data,
        }),
  );
};
