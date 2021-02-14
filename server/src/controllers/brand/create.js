module.exports = Brand => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { name } = req.body;

  const brand = new Brand({ name });

  brand.save(error =>
    error ? res.status(400).send(error) : res.status(200).send(brand),
  );
};
