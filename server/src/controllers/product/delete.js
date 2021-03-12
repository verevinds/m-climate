const fs = require('fs');
module.exports = Product => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const _id = req.params.id;

  Product.findByIdAndDelete({ _id }, async (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      try {
        await data.images.forEach(image => {
          const path = image.path.substr(0, image.path.lastIndexOf('.'));
          fs.unlinkSync(image.path);
          fs.unlinkSync(`${path}.webp`);
          // fs.unlinkSync(`${path}.avif`);
        });
      } catch (e) {
        console.error(e);
      }

      res.status(200).send({
        _id,
        message: `Товар "${data.name}" удалён!`,
        data,
      });
    }
  });
};
