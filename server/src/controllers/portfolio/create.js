module.exports = Portfolio => (req, res) => {
  try {
    if (!req.body) return res.sendStatus(400);

    const body = req.body;

    const portfolio = new Portfolio(body);

    portfolio.save(error =>
      error
        ? res.status(400).send(error)
        : res.status(200).send({
            portfolio,
            message: `Изображение "${portfolio.name}" добавлено!`,
          }),
    );
  } catch (err) {
    res.status(500).send(err);
  }
};
