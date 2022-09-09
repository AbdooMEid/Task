const noteModel = require("../model/note.schema");

const deleteNote = async (req, res) => {
  try {
    const notes = await noteModel.findOne({ _id: req.query._id });
    if (!notes) {
      res.status(201).json("notes not found");
    }
    await noteModel.findByIdAndDelete({ _id: req.query._id });
    res.status(200).json("deleted");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = deleteNote;
