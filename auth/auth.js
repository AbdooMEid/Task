const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");
  if (token && token != null && token != undefined) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) res.status(201).json("token is not valid!");
      req.id = decoded.id;
      req.email = decoded.email;
      req.name = decoded.name;
      req.role = decoded.role;
      next();
    });
  } else {
    res.status(201).json("your not authenticated");
  }
};
