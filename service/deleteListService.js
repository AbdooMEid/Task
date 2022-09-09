const listModel = require("../model/list.schema");
const accessModel = require("../model/access.model");
const noteModel = require("../model/note.schema");

const deleteList = async (req, res) => {
  try {
    const List = await listModel.findOne({ _id: req.query._id });
    if (!List) {
      return res.status(201).json("not Found");
    }
    const access = await accessModel.find({ listID: req.query._id });
    for (let i = 0; access.length > i; i++) {
      await accessModel.findByIdAndDelete(access[i]._id);
    }
    const noteID = await noteModel.find({ listID: req.query._id });
    for (let j = 0; noteID.length > j; j++) {
      await noteModel.findByIdAndDelete(noteID[j]._id);
    }
    await listModel.findByIdAndDelete({
      _id: req.query._id,
    });
    res.status(200).json("deleted");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = deleteList;
