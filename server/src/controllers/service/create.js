const mongoose = require('mongoose');

module.exports = Service => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { body } = req;

  const service = new Service(body);

  service.save(error =>
    error
      ? res.status(400).send(error)
      : res
          .status(200)
          .send({ service, message: `Услуга "${service.name}" добавлена!` }),
  );
};
