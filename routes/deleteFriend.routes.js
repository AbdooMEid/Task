const router = require("express").Router();
const auth = require("../auth/auth");
const deleteFriend = require("../service/deleteFriendService");
router.route("/deleteFriend").post(auth, deleteFriend);

module.exports = router;
