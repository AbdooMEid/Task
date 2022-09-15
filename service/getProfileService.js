const userModel = require("../model/user.schema");

const profile = async (req, res) => {
  try {
    const profile = await userModel
      .findById(req.id)
      .select("-password -friends -sentRequests -friendRequests");
    res.status(200).json(profile);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = profile;
