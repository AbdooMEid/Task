const userModel = require("../model/user.schema");

const addFriend = async (req, res) => {
  try {
    // add user1 data to user2 friendRequests
    // add user2 data to user1 sentRequests
    const { _id } = req.body;
    await userModel.updateOne(
      { _id: _id },
      { $push: { friendRequests: { _id: req.id } } }
    );
    await userModel.updateOne(
      { _id: req.id },
      { $push: { sentRequests: { _id: _id } } }
    );
    res.status(200).json("Friend Requests");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = addFriend;
