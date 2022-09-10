const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + Math.random() * 1000 + "-" + file.originalname);
  },
});
const upload = multer({
  dest: "public/img",
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const uploadFiles = upload.fields([
  { name: "noteImg", maxCount: 4 },
  { name: "noteFile", maxCount: 4 },
  { name: "imgUrl", maxCount: 1 },
]);

module.exports = uploadFiles;
