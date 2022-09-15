const router = require("express").Router();
const auth = require("../auth/auth");
const addFriend = require("../service/addFriendService");
router.route("/addFriend").post(auth, addFriend);

module.exports = router;
