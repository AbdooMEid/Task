const listModel = require("../model/list.schema");

const getList = async (req, res) => {
  try {
    const List = await listModel.find({ userID: req.id });
    res.status(200).json(List);
  } catch (error) {
    res.status(201).json(error.message);
  }
};
module.exports = getList;
