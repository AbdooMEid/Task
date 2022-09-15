const router = require("express").Router();
const auth = require("../auth/auth");
const createNote = require("../service/addNoteService");
const uploadFiles = require("../config/uploadImage");
router.route("/note").post(auth, uploadFiles, createNote);

module.exports = router;
// module.exports = uploadFiles;
