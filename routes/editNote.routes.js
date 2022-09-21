const router = require("express").Router();
const auth = require("../auth/auth");
const editNote = require("../service/editNoteService");
// const uploadFiles = require("../config/uploadImage");

router.route("/editNote").put(auth, editNote);

module.exports = router;
