const listModel = require("../model/list.schema");
const accessModel = require("../model/access.model");

const getAccess = async (req, res) => {
  try {
    let finalList = [];
    const List = await accessModel.find({ access: req.id });
    for (let i = 0; List.length > i; i++) {
      const lists = await listModel.findById(List[i].listID);
      finalList.push(lists);
    }
    res.status(200).json(finalList);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = getAccess;
