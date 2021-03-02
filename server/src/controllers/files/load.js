var uuidv4 = require('uuid-v4');
var path = require('path');
var fs = require('fs');
const sharp = require('sharp');

exports.load = (req, res) => {
  try {
    if (req.files) {
      const { file } = req.files;
      const filename = path.extname(file.name);
      const name = uuidv4();
      const fullName = `${name}${filename}`;
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

      file.mv(`${dir}/${fullName}`, err => {
        if (err) {
          res.status(500).send('error occured');
        }
      });

      console.log(file, 'form image is here');
      console.log(file.data, 'form image buffer data is here');

      sharp(file.data)
        .toBuffer()
        .then(newBuffer => {
          file.data = newBuffer;

          file.mv(`${dir}/${name}.webp`, err => {
            if (err) {
              return res.status(500).send(err);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });

      res.status(200).send({
        message: `Файл ${filename} успешно загружен`,
        url: `${process.env.API}/uploads/${folder}/${fullName}`,
        path: `${dir}/${fullName}`,
        filename,
        wasFile: true,
      });
    } else {
      res.status(400).send({
        message: 'Файл отсутствует',
        wasFile: false,
      });
    }
  } catch (err) {
    let text;
    if (err.code === 'ENOENT') {
      text = `Сервер: Отсутствует директория \"${err.path}\".`;
    }

    res.status(400).send({
      message: text ?? 'Неизвестная ошибка на сервере',
    });
  }
};
