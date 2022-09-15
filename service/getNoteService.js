const noteModel = require("../model/note.schema");

const getNote = async (req, res) => {
  try {
    const { listID } = req.query;
    const Notes = await noteModel.find({ listID });
    if (!Notes) {
      return res.status(201).json([]);
    }
    res.status(200).json(Notes);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = getNote;
