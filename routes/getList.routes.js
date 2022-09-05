const router = require("express").Router();
const auth = require("../auth/auth");
const listModel = require("../model/list.schema");

router.get("/getAllList", auth, async (req, res) => {
  try {
    const List = await listModel.find({ userID: req.id });
    res.status(200).json(List);
  } catch (error) {
    res.status(201).json(error.message);
  }
});
module.exports = router;
