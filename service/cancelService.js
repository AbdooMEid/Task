const userModel = require("../model/user.schema");

const cancelFriend = async (req, res) => {
  try {
    // remove me from friendRequests
    // add friend from sentRequests
    const { _id } = req.body;
    await userModel.updateOne(
      { _id: _id },
      { $pull: { friendRequests: { _id: req.id } } }
    );
    await userModel.updateOne(
      { _id: req.id },
      { $pull: { sentRequests: { _id: _id } } }
    );
    res.status(200).json("cancel Requests ");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = cancelFriend;
