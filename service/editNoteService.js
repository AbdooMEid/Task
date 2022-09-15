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
const editNote = async (req, res) => {
  try {
    const { titleNote, descNote, doneTask, expDate } = req.body;
    const editNote = await noteModel.findOne({ _id: req.body._id });
    if (!editNote) {
      return res.status(201).json("Not Found");
    }
    // let images = req.files.noteImg;
    // let files = req.files.noteFile;
    // let imagesPath = [];
    // let filesPath = [];
    // let type = [];
    // let finalPath = [];

    // if (images !== undefined) {
    //   for (let i = 0; images.length > i; i++) {
    //     imagesPath.push(images[i].path);
    //     type.push(images[i].mimetype);
    //   }
    // }
    // if (files !== undefined) {
    //   for (let j = 0; files.length > j; j++) {
    //     filesPath.push(files[j].path);
    //   }
    // }
    // for (let k = 0; type.length > k; k++) {
    //   if (
    //     type[k] == "image/png" ||
    //     type[k] == "image/jpeg" ||
    //     type[k] == "image/jpg" ||
    //     type[k] == "image/webp"
    //   ) {
    //     finalPath.push(imagesPath[k]);
    //   } else {
    //     throw new Error("failed Upload");
    //   }
    // }
    await noteModel.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        titleNote,
        descNote,
        doneTask,
        expDate,
        // noteImg: finalPath,
        // noteFile: filesPath,
      }
    );
    res.status(200).json("updated");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = { editNote, upload };
