const router = require("express").Router();
const auth = require("../auth/auth");
const rejectFriend = require("../service/rejectFriendService");
router.route("/rejectFriend").post(auth, rejectFriend);

module.exports = router;
