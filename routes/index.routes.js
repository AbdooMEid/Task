const router = require("express").Router();

router.use("/", require("./register.routes"));
router.use("/", require("./login.routes"));
router.use("/", require("./list.routes"));
router.use("/", require("./getList.routes"));
router.use("/", require("./editList.routes"));
router.use("/", require("./deleteList.routes"));
router.use("/", require("./addNote.routes"));
router.use("/", require("./getAllNote.routes"));
router.use("/", require("./editNote.routes"));
router.use("/", require("./deleteNote.routes"));
router.use("/", require("./addFrindes.routes"));
router.use("/", require("./cancel.routes"));
router.use("/", require("./accept.routes"));
router.use("/", require("./rejected.routes"));
router.use("/", require("./getAllFriend.routes"));
router.use("/", require("./getFriendRequests.routes"));
router.use("/", require("./sentRequests.routes"));
router.use("/", require("./search.routes"));
router.use("/", require("./deleteFriend.routes"));
router.use("/", require("./access.routes"));
router.use("/", require("./removeAccess.routes"));
router.use("/", require("./getAccess.routes"));
router.use("/", require("./getListAccess.routes"));
router.use("/", require("./getProfile.routes"));
router.use("/", require("./updateProfile.routes"));
router.use("/", require("./contactUs.routes"));
router.use("/", require("./getContactUs.routes"));


module.exports = router;
