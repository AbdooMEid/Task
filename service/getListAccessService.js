const accessModel = require("../model/access.model");
const userModel = require("../model/user.schema");
const getListAccess = async (req, res) => {
  try {
    const { _idList } = req.query;
    let names = [];
    const Access = await accessModel.find({ listID: _idList });
    for (let i = 0; Access.length > i; i++) {
      const user = await userModel.findById(Access[i].access);
      let name = user.name;
      names.push({ name, access: Access[i].access, listID: _idList });
    }
    res.status(200).json(names);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = getListAccess;
