const multer = require("multer");
const createMulterDiskStorage = (destPath, fileFieldName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destPath);
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(
        null,
        `${req.body[fileFieldName].replace(/\s/g, "")}-${Date.now()}.${ext}`
      );
    },
  });
};
module.exports = { createMulterDiskStorage };
