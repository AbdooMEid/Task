const router = require("express").Router();
const auth = require("../auth/auth");
const userModel = require("../model/user.schema");

router.post("/addFriend", auth, async (req, res) => {
  try {
    // add user1 data to user2 friendRequests
    // add user2 data to user1 sentRequests
    const { _id, name } = req.body;
    await userModel.updateOne(
      { _id: _id },
      { $push: { friendRequests: { name: req.name, _id: req.id } } }
    );
    await userModel.updateOne(
      { _id: req.id },
      { $push: { sentRequests: { name: name, _id: _id } } }
    );
    res.status(200).json("Friend Requests");
  } catch (error) {
    res.status(201).json(error.message);
  }
});

module.exports = router;
