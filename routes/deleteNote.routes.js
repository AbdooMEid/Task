const router = require("express").Router();
const auth = require("../auth/auth");
const deleteNote = require("../service/deleteNoteService");
router.route("/deleteNote").delete(auth, deleteNote);

module.exports = router;
