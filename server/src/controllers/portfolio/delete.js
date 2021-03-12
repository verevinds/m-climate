const fs = require('fs');
module.exports = Portfolio => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const _id = req.params.id;

  Portfolio.findByIdAndDelete({ _id }, async (err, data) => {
    if (err) res.status(400).send(err);
    else {
      try {
        const path = data.path.substr(0, data.path.lastIndexOf('.'));
        await fs.unlinkSync(data.path);
        await fs.unlinkSync(`${path}.webp`);
        // await fs.unlinkSync(`${path}.avif`);
      } catch (e) {
        console.error(e);
      }
      res.status(200).send({
        _id,
        message: `Изображение "${data._id}" удалёно!`,
        data,
        err,
      });
    }
  });
};
