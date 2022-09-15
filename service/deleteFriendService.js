const userModel = require("../model/user.schema");

const deleteFriend = async (req, res) => {
  try {
    // remove me from friendRequests
    // remove friend from sentRequests
    const { _id } = req.body;
    await userModel.updateOne(
      { _id: req.id },
      { $pull: { friends: { _id: _id } } }
    );
    await userModel.updateOne(
      { _id: _id },
      { $pull: { friends: { _id: req.id } } }
    );
    res.status(200).json("delete Requests");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = deleteFriend;
