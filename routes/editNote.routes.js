const router = require("express").Router();
const auth = require("../auth/auth");
const noteModel = require("../model/note.schema");

router.put("/editNote", auth, async (req, res) => {
  try {
    const { titleNote, descNote, doneTask } = req.body;
    const editNote = await noteModel.findOne({ _id: req.body._id });
    if (!editNote) {
      return res.status(201).json("Not Found");
    }
    await noteModel
      .findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        { titleNote, descNote, doneTask }
      );
    res.status(200).json("updated");
  } catch (error) {
    res.status(201).json(error.message);
  }
});

module.exports = router;
