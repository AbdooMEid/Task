const router = require("express").Router();
const auth = require("../auth/auth");
const userModel = require("../model/user.schema");
router.post("/search", auth, async (req, res) => {
  try {
    const { name } = req.body;
     await userModel.find({ name : {$regex : name , $options : '$i'} }).select("-password").then(data => {
      res.status(200).json(data);
     })
  } catch (error) {
    res.status(201).json(error.message);
  }
});
module.exports = router;
