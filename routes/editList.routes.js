const router = require("express").Router();
const auth = require("../auth/auth");
const editList = require("../service/editListService");
router.route("/editList").put(auth, editList);

module.exports = router;
