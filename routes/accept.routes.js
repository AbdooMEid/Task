const router = require("express").Router();
const auth = require("../auth/auth");
const acceptFriend = require("../service/acceptService");
router.route("/acceptFriend").post(auth, acceptFriend);

module.exports = router;
