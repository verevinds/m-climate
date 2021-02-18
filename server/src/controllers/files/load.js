var uuidv4 = require('uuid-v4');
var path = require('path');

exports.load = (req, res) => {
  if (req.files) {
    const { file } = req.files;
    const filename = path.extname(file.name);
    const name = `${uuidv4()}${filename}`;

    file.mv(`${'./public/uploads/'}${name}`, err => {
      if (err) {
        res.status(400).send('error occured');
      } else {
        res.status(200).send({
          message: `Файл ${filename} успешно загружен`,
          url: `${process.env.URL_SERVER}:8081/uploads/${name}`,
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
