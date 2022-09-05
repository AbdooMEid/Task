const router = require("express").Router();
const auth = require("../auth/auth");
const userModel = require("../model/user.schema");

router.get("/getAllFriends", auth, async (req, res) => {
  try {
    const Friends = await userModel.findById(req.id);
    res.status(200).json(Friends.friends);
  } catch (error) {
    res.status(201).json(error.message);
  }
});

module.exports = router;
