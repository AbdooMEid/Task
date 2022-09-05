const router = require("express").Router();
const auth = require("../auth/auth");
const accessModel = require("../model/access.model");

/*
response => [
    {
        "_id": "630d3ba3bbe95f560990e7d3",
        "listID": "630b3a7c985f1ec3074233ce",
        "access": "62d60ea2d6c9e216ef21a545",
        "__v": 0,
        "createdAt": "2022-08-29T22:20:19.799Z",
        "updatedAt": "2022-08-29T22:20:19.799Z"
    }
]
method => get 
{ _idList } = req.query;
end point => /getAccess
*/


router.get("/getAccess", auth, async (req, res) => {
  try {
    const { _idList } = req.query;
    const Access = await accessModel.find({ listID: _idList });
    res.status(200).json(Access);
  } catch (error) {
    res.status(201).json(error.message);
  }
});
module.exports = router;
