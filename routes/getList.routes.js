const router = require("express").Router();
const auth = require("../auth/auth");
const getList = require("../service/getListService");
router.route("/getAllList").get(auth, getList);
module.exports = router;
