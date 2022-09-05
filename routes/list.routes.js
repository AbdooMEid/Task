const router = require("express").Router();
const auth = require("../auth/auth");
const listModel = require("../model/list.schema");
const accessModel = require("../model/access.model");
router.post("/list", auth, async (req, res) => {
  try {
    const { titleList, color } = req.body;
    if (!titleList) {
      return res.status(201).json("title can not be empty");
    }
    const listed = await listModel.insertMany({
      titleList,
      color,
      userID: req.id,
    });
    for (let i = 0; listed.length > i; i++) {
      await accessModel.create({
        listID: listed[i]._id,
        name: req.name,
        userID: req.id,
      });
    }
    res.status(200).json("done");
  } catch (error) {
    res.status(201).json(error.message);
  }
});

module.exports = router;
