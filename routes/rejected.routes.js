const router = require("express").Router();
const auth = require("../auth/auth");
const userModel = require("../model/user.schema");

router.post("/rejectFriend", auth, async (req, res) => {
  try {
    // remove me from friendRequests
    // remove friend from sentRequests
    const { _id, name } = req.body;
    await userModel.updateOne(
      { _id: req.id },
      { $pull: { friendRequests: { name: name, _id: _id } } }
    );
    await userModel.updateOne(
      { _id: _id },
      { $pull: { sentRequests: { name: req.name, _id: req.id } } }
    );
    res.status(200).json("rejected Requests ");
  } catch (error) {
    res.status(201).json(error);
  }
});

module.exports = router;
