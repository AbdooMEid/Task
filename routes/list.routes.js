const router = require("express").Router();
const auth = require("../auth/auth");
const createList = require("../service/addListService");

router.route("/list").post(auth, createList);

module.exports = router;
