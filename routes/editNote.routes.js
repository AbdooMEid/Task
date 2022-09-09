const router = require("express").Router();
const auth = require("../auth/auth");
const editNote = require("../service/editNoteService");
router.route("/editNote").put(auth, editNote);

module.exports = router;
