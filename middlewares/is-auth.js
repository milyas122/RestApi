const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.headers["x-auth-token"] || req.headers["authorization"];
  if (!token)
    return res
      .status(404)
      .json({ message: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, "Here is Secret Key");
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Invalid token" });
  }
};
