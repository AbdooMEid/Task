const router = require("express").Router();
const auth = require("../auth/auth");
const userModel = require("../model/user.schema");

router.post("/cancelRequests", auth, async (req, res) => {
  try {
    // remove me from friendRequests
    // add friend from sentRequests
    const { _id, name } = req.body;
    await userModel.updateOne(
      { _id: _id },
      { $pull: { friendRequests: { name: req.name, _id: req.id } } }
    );
    await userModel.updateOne(
      { _id: req.id },
      { $pull: { sentRequests: { name: name, _id: _id } } }
    );
    res.status(200).json('cancel Requests ')
  } catch (error) {
    res.status(201).json(error.message)
  }
});

module.exports = router;
