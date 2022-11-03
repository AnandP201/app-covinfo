const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (e) {
    if (e.message === "jwt expired") {
      res.status(500).send({ message: "Session expired! Please login again." });
    }
  }
};
