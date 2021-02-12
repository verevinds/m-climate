
const path = require('path');

exports.load = (req, res, next) => {
        console.log(req.files)
    if (req.files) {
        let file = req.files.file;
        console.log(typeof file)
        let uuid = Math.random(4000);
        let filename = file.name;
        let name = `${filename}`;

        file.mv(`${'./public/uploads/'}${name}`, (err) => {
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
        message: `Файл отсутствует`,
        wasFile: false,
        });
    }
};