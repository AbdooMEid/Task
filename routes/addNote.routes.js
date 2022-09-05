const router = require("express").Router();
const auth = require("../auth/auth");
const noteModel = require("../model/note.schema");

router.post("/note", auth, async (req, res) => {
  try {
    const { titleNote, descNote, doneTask, listID } = req.body;
    if (!titleNote || !listID) {
      return res.status(201).json("title can not be empty");
    }
    const Note = await noteModel.insertMany({
      titleNote,
      descNote,
      doneTask,
      userID: req.id,
      listID,
    });
    res.status(200).json("done");
  } catch (error) {
    res.status(201).json(error.message);
  }
});

module.exports = router;
