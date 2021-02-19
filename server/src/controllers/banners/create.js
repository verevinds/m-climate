module.exports = Banners => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const body = req.body;

  const banners = new Banners(body);

  banners.save(error =>
    error
      ? res.status(400).send(error)
      : res
          .status(200)
          .send({ banners, message: `Баннер "${banners.name}" добавлен!` }),
  );
};
