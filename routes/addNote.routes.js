const router = require("express").Router();
const auth = require("../auth/auth");
const addNote = require("../service/addNoteService");
router.route("/note").post(auth, addNote);

module.exports = router;
