const router = require("express").Router();
const auth = require("../auth/auth");
const userModel = require("../model/user.schema");

router.get("/friendRequests", auth, async (req, res) => {
  try {
    const friendRequests = await userModel.findById(req.id)
    res.status(200).json(friendRequests.friendRequests);
  } catch (error) {
    res.status(201).json(error);
  }
});
module.exports = router;
