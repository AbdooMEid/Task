const contactModel = require("../model/contactUs.model");

const contactUs = async (req, res) => {
  try {
    const contact = new contactModel({
      userId: req.id,
      name: req.name,
      email: req.email,
      message: req.body.message,
    });
    await contact.save();
    res.status(200).json("saved");
  } catch (error) {
    res.status(201).json(error.message);
  }
};

module.exports = contactUs;
