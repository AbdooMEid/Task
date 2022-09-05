const router = require("express").Router();
const auth = require("../auth/auth");
const listModel = require("../model/list.schema");
const accessModel = require("../model/access.model");

/*
method => get
response => [
    {
        "_id": "630b3a7c985f1ec3074233ce",
        "userID": "6309e81af7acd2289ce6dd9e",
        "titleList": "mohammed ",
        "color": "#e2e2e2",
        "createdAt": "2022-08-28T09:50:29.117Z",
        "access": [],
        "fullAccess": [],
        "__v": 0,
        "updatedAt": "2022-08-29T20:37:54.108Z"
    },
    {
        "_id": "630a146c18321948ed716445",
        "userID": "6309e81af7acd2289ce6dd9e",
        "titleList": "abdo",
        "color": "#a00037",
        "createdAt": "2022-08-27T10:37:22.313Z",
        "access": [],
        "fullAccess": [],
        "__v": 0,
        "updatedAt": "2022-08-28T09:18:36.875Z"
    }
]
/getAccessList
*/
router.get("/getAccessList", auth, async (req, res) => {
  try {
    let finalList = [];
    const List = await accessModel.find({ access: req.id });
    for (let i = 0; List.length > i; i++) {
      const lists = await listModel.findById(List[i].listID);
      finalList.push(lists);
    }
    res.status(200).json(finalList);
  } catch (error) {
    res.status(201).json(error.message);
  }
});
module.exports = router;
