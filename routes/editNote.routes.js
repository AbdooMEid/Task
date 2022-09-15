const router = require("express").Router();
const auth = require("../auth/auth");
const { editNote, upload } = require("../service/editNoteService");
const uploadFiles = upload.fields([
  { name: "noteImg", maxCount: 4 },
  { name: "noteFile", maxCount: 4 },
]);
router.route("/editNote").put(auth, uploadFiles, editNote);

module.exports = router;
