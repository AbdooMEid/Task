const contactModel = require("../model/contactUs.model");

const contactUs = async (req, res) => {
  try {
    console.log(req.body.message);
    const contact = new contactModel({
      userId: req.id,
      name: req.name,
      email: req.email,
      message: req.body.message,
    });
    if (!message) {
      return res.status(201).json("message is empty");
    }
    await contact.save();
    res.status(200).json("saved");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = contactUs;
