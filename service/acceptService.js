const userModel = require("../model/user.schema");

const acceptFriend = async (req, res) => {
  try {
    // add data from
    const { _id, name } = req.body;
    await userModel.updateOne(
      { _id: req.id },
      {
        $push: { friends: { name: name, _id: _id } },
      }
    );
    await userModel.updateOne(
      { _id: _id },
      {
        $push: { friends: { name: req.name, _id: req.id } },
      }
    );

    await userModel.updateOne(
      { _id: req.id },
      { $pull: { friendRequests: { name: name, _id: _id } } }
    );
    await userModel.updateOne(
      { _id: _id },
      { $pull: { sentRequests: { name: req.name, _id: req.id } } }
    );

    res.status(200).json("accept Requests ");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = acceptFriend;
