const userModel = require("../model/user.schema");

const getFriendRequests = async (req, res) => {
  try {
    const friendRequests = await userModel.findById(req.id);
    res.status(200).json(friendRequests.friendRequests);
  } catch (error) {
    res.status(201).json(error);
  }
};

module.exports = getFriendRequests;
