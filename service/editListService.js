const listModel = require("../model/list.schema");

const editList = async (req, res) => {
  try {
    const { titleList, color } = req.body;
    // const _id = req.body;
    const editList = await listModel.findOne({ _id: req.body._id });
    if (!editList) {
      return res.status(201).json("Not Found");
    }
    await listModel.findByIdAndUpdate(
      { _id: req.body._id },
      { titleList, color }
    );
    res.status(200).json("updated");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = editList;
