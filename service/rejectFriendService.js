const userModel = require("../model/user.schema");

const rejectFriend = async (req, res) => {
  try {
    // remove me from friendRequests
    // remove friend from sentRequests
    const { _id } = req.body;
    await userModel.updateOne(
      { _id: req.id },
      { $pull: { friendRequests: { _id: _id } } }
    );
    await userModel.updateOne(
      { _id: _id },
      { $pull: { sentRequests: { _id: req.id } } }
    );
    res.status(200).json("rejected Requests ");
  } catch (error) {
    res.status(201).json(error);
  }
};

module.exports = rejectFriend;
