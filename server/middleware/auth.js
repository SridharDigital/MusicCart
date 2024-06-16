const jwt = require("jsonwebtoken");

const verifyAuthentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({
      status: "ERROR",
      message: "Authentication failed. Please log in to continue.",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "ERROR",
      message: "Invalid token. Please log in to continue.",
    });
  }
};

module.exports = verifyAuthentication;
