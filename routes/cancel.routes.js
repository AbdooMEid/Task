const router = require("express").Router();
const auth = require("../auth/auth");
const cancelFriend = require("../service/cancelService");
router.route("/cancelRequests").post(auth, cancelFriend);

module.exports = router;
