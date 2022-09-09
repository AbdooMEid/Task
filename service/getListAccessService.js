const accessModel = require("../model/access.model");

const getListAccess = async (req, res) => {
  try {
    const { _idList } = req.query;
    const Access = await accessModel.find({ listID: _idList });
    res.status(200).json(Access);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = getListAccess;
