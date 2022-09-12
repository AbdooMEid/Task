const userModel = require("../model/user.schema");

const getFriendRequests = async (req, res) => {
  try {
    let names = [];
    const friendRequests = await userModel.findById(req.id);
    for (let i = 0; friendRequests.friendRequests.length > i; i++) {
      const user = await userModel.findById(friendRequests.friendRequests[i]._id);
      const name = user.name;
      names.push({ name, _id: friendRequests.friendRequests[i]._id });
    }
    res.status(200).json(names);
  } catch (error) {
    res.status(201).json(error);
  }
};

module.exports = getFriendRequests;
