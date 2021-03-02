const fs = require('fs');
module.exports = Banners => (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const _id = req.params.id;

  Banners.findByIdAndDelete({ _id }, (err, data) => {
    if (err) res.status(400).send(err);
    else {
      try {
        fs.unlinkSync(data.path);
        fs.unlinkSync(
          data.path.substr(0, data.path.lastIndexOf('.')) + '.webp',
        );
      } catch (e) {
        console.error(e);
      }
      res.status(200).send({
        _id,
        message: `Баннер "${data.name}" удалён!`,
        data,
        err,
      });
    }
  });
};
