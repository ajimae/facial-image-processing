const fs = require('fs');
const path = require('path');
const multer = require("multer");
const { TEMP_UPLOAD_URL, TEMP_IMG_NAME } = require('../utils/constant');

// const storage = 
const uploadSingle = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, callback) => {
    // Accept image files only
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { // other file formats can be included in the future e.g (csv|json|txt)
      callback(null, false);
      return req.fileValidationError = 'only image files with extension [png|jpg|jpeg] are allowed!';
    }
  
    callback(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', '..', 'tmp');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      cb(null, TEMP_UPLOAD_URL);
    },
    filename: (req, file, cb) => cb(null, TEMP_IMG_NAME(file)),
  }),
});

// const multiStorage = 
const uploadMultiple = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `${LABELED_IMAGES_URL}/${req.body.label}`;
      !fs.existsSync(dir) ? fs.mkdirSync(dir) : null;
      cb(null, path.join(dir))
    },
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
});

module.exports = { uploadSingle, uploadMultiple }