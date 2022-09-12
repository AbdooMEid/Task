const userModel = require("../model/user.schema");

const acceptFriend = async (req, res) => {
  try {
    // add data from
    const { _id } = req.body;
    await userModel.updateOne(
      { _id: req.id },
      {
        $push: { friends: { _id: _id } },
      }
    );
    await userModel.updateOne(
      { _id: _id },
      {
        $push: { friends: { _id: req.id } },
      }
    );

    await userModel.updateOne(
      { _id: req.id },
      { $pull: { friendRequests: { _id: _id } } }
    );
    await userModel.updateOne(
      { _id: _id },
      { $pull: { sentRequests: { _id: req.id } } }
    );

    res.status(200).json("accept Requests ");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = acceptFriend;
