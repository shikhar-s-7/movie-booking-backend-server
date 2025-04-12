const multer = require('multer');

// storage engine for multer
const storage = multer.diskStorage({
  //destination directory for uploaded files
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    //filename for the uploaded file
    filename: (req, file, cb) => {
        // filename format: current timestamp + original file name
        cb(null, Date.now() + '-' + file.originalname);
    },
});

module.exports = multer({ storage });
