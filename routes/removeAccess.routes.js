const router = require("express").Router();
const accessModel = require("../model/access.model");
const auth = require("../auth/auth");

/*
remove access
method => post
response => "deleted"
{ _id, _idList } = req.body;
/removeAccess
*/
router.post("/removeAccess", auth, async (req, res) => {
  try {
    const { _id, _idList } = req.body;
    await accessModel.findOneAndDelete({
      listID: _idList,
      access: _id,
    });
    res.status(200).json("deleted");
  } catch (error) {
    res.status(201).json(error.message);
  }
});

module.exports = router;
