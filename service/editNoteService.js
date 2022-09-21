const noteModel = require("../model/note.schema");

const editNote = async (req, res) => {
  try {
    const { titleNote, descNote, expDate, done } = req.body;
    const editNote = await noteModel.findOne({ _id: req.body._id });
    if (!editNote) {
      return res.status(201).json("Not Found");
    }
    let images = req.files.noteImg;
    let files = req.files.noteFile;
    let imagesPath = [];
    let filesPath = [];
    let type = [];
    let finalPath = [];
    let sizeImg = [];
    let sizeFile = [];
    let finalFile = [];

    if (images !== undefined) {
      for (let i = 0; images.length > i; i++) {
        imagesPath.push(images[i].path);
        type.push(images[i].mimetype);
        sizeImg.push(images[i].size);
      }
    }
    if (files !== undefined) {
      for (let j = 0; files.length > j; j++) {
        filesPath.push(files[j].path);
        sizeFile.push(files[j].size);
      }
    }
    for (let n = 0; sizeImg.length > n; n++) {
      if (sizeImg[n] >= 1024 * 1024 * 5) {
        return res.status(201).json("file too large Image");
      }
    }
    for (let b = 0; sizeFile.length > b; b++) {
      if (sizeFile[b] <= 1024 * 1024 * 5) {
        finalFile.push(filesPath[b]);
      } else {
        return res.status(201).json("file too large file");
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
      } else {
        return res.status(201).json("failed Upload type png/jpeg/jpg");
      }
    }
   
    await noteModel.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        titleNote,
        descNote,
        expDate,
        doneTask: done,
        noteImg: finalPath,
        noteFile: finalFile,
      }
    );
    res.status(200).json("updated");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = editNote;
