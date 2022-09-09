const router = require("express").Router();
const auth = require("../auth/auth");
const { createNote, upload } = require("../service/addNoteService");
const uploadFiles = upload.fields([
  { name: "noteImg", maxCount: 4 },
  { name: "noteFile", maxCount: 4 },
]);

router.route("/note").post(auth, uploadFiles, createNote);

module.exports = router;
