const jwtController = require("../controllers/jwtController");

exports.verifyJWT = (req, res, next) => {
  const token = req.headers?.authorization || req.cookies?.auth;

  if (!token) {
    return res.status(401).json({ code: 401, message: "Unauthorized request" });
  }

  const actualToken = token.includes("Bearer") ? token.slice(7) : token;
  const decoded = jwtController.verifyToken(actualToken);

  if (!decoded) {
    return res
      .status(403)
      .json({ code: 403, message: "Invalid or expired token" });
  }

  req.decoded = decoded; // Attach decoded payload to request
  next();
};
