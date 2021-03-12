const fs = require('fs');
module.exports = (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const _id = req.body.id;
  const path = req.body.path;
  const name = req.body.filename;

  try {
    const pathWithoutExtension = path.substr(0, path.lastIndexOf('.'));
    fs.unlinkSync(path);
    fs.unlinkSync(`${pathWithoutExtension}.webp`);
    // fs.unlinkSync(`${pathWithoutExtension}.avif`);
    res.status(200).send({
      _id,
      message: `Изображение "${name}" удалено!`,
      data: req.body,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      _id,
      message: e.message,
      data: req.body,
    });
  }
};
