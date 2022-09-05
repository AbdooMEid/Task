const router = require("express").Router();
const auth = require("../auth/auth");
const noteModel = require("../model/note.schema");

router.delete("/deleteNote", auth, async (req, res) => {
  try {
    const notes = await noteModel.findOne({ _id: req.query._id });
    if (notes) {
      await noteModel.findByIdAndDelete({ _id: req.query._id });
      res.status(200).json("deleted");
    } else {
      res.status(201).json("notes not found");
    }
  } catch (error) {
    res.status(201).json(error.message);
  }
});

module.exports = router;
