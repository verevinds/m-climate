var fs = require('fs-extra');

exports.load = (req, res) => {
    console.log('file load')
       var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            console.log({__dirname})
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('back');           //where to go next
            });
        });

}