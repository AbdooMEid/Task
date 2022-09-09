const noteModel = require("../model/note.schema");
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
const createNote = async (req, res) => {
  try {
    const { titleNote, descNote, doneTask, listID, expDate } = req.body;
    if (!titleNote || !listID) {
      return res.status(201).json("title can not be empty");
    }

    let images = req.files.noteImg;
    let files = req.files.noteFile;
    let imagesPath = [];
    let filesPath = [];
    let type = [];
    let finalPath = [];

    if (images !== undefined) {
      for (let i = 0; images.length > i; i++) {
        imagesPath.push(images[i].path);
        type.push(images[i].mimetype);
      }
    }
    if (files !== undefined) {
      for (let j = 0; files.length > j; j++) {
        filesPath.push(files[j].path);
      }
    }
    for (let k = 0; type.length > k; k++) {
      if (
        type[k] == "image/png" ||
        type[k] == "image/jpeg" ||
        type[k] == "image/jpg" ||
        type[k] == "image/webp"
      ) {
        finalPath.push(imagesPath[k]);
      }
    }
    await noteModel.insertMany({
      titleNote,
      descNote,
      doneTask,
      expDate,
      userID: req.id,
      listID,
      noteImg: finalPath,
      noteFile: filesPath,
    });
    res.status(200).json("done");

  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = { createNote, upload };