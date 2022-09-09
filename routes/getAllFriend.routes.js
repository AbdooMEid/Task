const router = require("express").Router();
const auth = require("../auth/auth");
const getAllFriend = require("../service/getAllFriendService");
router.route("/getAllFriends").get(auth, getAllFriend);

module.exports = router;
