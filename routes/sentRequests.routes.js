const router = require("express").Router();
const auth = require("../auth/auth");
const userModel = require("../model/user.schema");

router.get("/sentRequests", auth, async (req, res) => {
  try {
    const sentRequests = await userModel.findById(req.id)
    res.status(200).json(sentRequests.sentRequests);
  } catch (error) {
    res.status(201).json(error.message);
  }
});
module.exports = router;
