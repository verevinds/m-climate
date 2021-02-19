module.exports = Banners => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const _id = req.params.id;

  Banners.findByIdAndDelete({ _id }, (err, data) =>
    error
      ? res.status(400).send(error)
      : res.status(200).send({
          _id,
          message: `Баннер "${data.name}" удалён!`,
          data,
          err,
        }),
  );
};
