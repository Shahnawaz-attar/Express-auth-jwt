const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  const token = req.headers.autherization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
