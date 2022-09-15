const router = require("express").Router();
const auth = require("../auth/auth");
const getFriendRequests = require("../service/getFriendRequestService");
router.route("/friendRequests").get(auth, getFriendRequests);
module.exports = router;
