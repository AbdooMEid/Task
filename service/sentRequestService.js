const userModel = require("../model/user.schema");

const sentRequest = async (req, res) => {
  try {
    const sentRequests = await userModel.findById(req.id);
    res.status(200).json(sentRequests.sentRequests);
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = sentRequest;
