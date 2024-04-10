const multer = require("multer")
const path = require("path")
const attachmentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(
        null,
        path.parse(file.originalname).name +
          "_" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({ storage: attachmentStorage });

  module.exports = { upload }