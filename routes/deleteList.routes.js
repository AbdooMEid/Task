const router = require("express").Router();
const auth = require("../auth/auth");
const deleteList = require("../service/deleteListService")
router.route("/deleteList").delete(auth , deleteList);

module.exports = router;
