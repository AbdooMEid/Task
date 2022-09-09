const router = require("express").Router();
const auth = require("../auth/auth");
const getNote = require("../service/getNoteService");
router.route("/getNotes").get(auth, getNote);

module.exports = router;
