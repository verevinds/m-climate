exports.load = (req, res) => {
  if (req.files) {
    const { file } = req.files;
    const filename = file.name;
    const name = `${filename}`;

    file.mv(`${'./public/uploads/'}${name}`, err => {
      if (err) {
        res.send('error occured');
      } else {
        res.send({
          message: `Файл ${filename} успешно загружен`,
          url: `${process.env.URL_SERVER}:8081/uploads/${name}`,
          filename,
          wasFile: true,
        });
      }
    });
  } else {
    res.send({
      message: 'Файл отсутствует',
      wasFile: false,
    });
  }
};
