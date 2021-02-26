var uuidv4 = require('uuid-v4');
var path = require('path');
var fs = require('fs');

exports.load = (req, res) => {
  if (req.files) {
    const { file } = req.files;
    const filename = path.extname(file.name);
    const name = `${uuidv4()}${filename}`;
    const folder = req.body.folder;
    const dir = `./public/uploads/${folder}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (!folder)
      res.status(400).send({
        message: 'Путь для хранения отсутствует',
        wasFile: true,
      });

    file.mv(`${dir}/${name}`, err => {
      if (err) {
        res.status(400).send('error occured');
      } else {
        res.status(200).send({
          message: `Файл ${filename} успешно загружен`,
          url: `${process.env.API}/uploads/${folder}/${name}`,
          path: `${dir}/${name}`,
          filename,
          wasFile: true,
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Файл отсутствует',
      wasFile: false,
    });
  }
};
