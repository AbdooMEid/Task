const router = require("express").Router();
const accessModel = require("../model/access.model");
const auth = require("../auth/auth");

/*
addAccess
method => post
response => "doneAccess"
    { _id, _idList } = req.body;
    /addAccess
    */
router.post("/addAccess", auth, async (req, res) => {
  try {
    const { _id, _idList, name } = req.body;
    const access = await accessModel.insertMany({
      listID: _idList,
      access: _id,
      name,
    });

    res.status(200).json("doneAccess");
  } catch (error) {
    res.status(201).json(error.message);
  }
});

module.exports = router;
