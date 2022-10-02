const admin = (req, res, next) => {
  if (!req.role) {
    return res.status(403).json("you are not admin user....");
  }
  next();
};

module.exports = admin;
