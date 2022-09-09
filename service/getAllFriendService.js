const userModel = require("../model/user.schema");

const getAllFriend = async (req, res) => {
  try {
    const Friends = await userModel.findById(req.id);
    res.status(200).json(Friends.friends);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = getAllFriend;
