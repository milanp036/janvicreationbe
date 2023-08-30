const { httpCodes } = require("../../constant");
const AccountDtl = require("../models/Account");
const jwt = require("jsonwebtoken");

const hasApiAccess = async (req, res, next) => {
  try {
    const bearerToken = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")[1]
      : req.headers["Authorization"]
      ? req.headers["Authorization"].split(" ")[1]
      : null;
    if (!bearerToken)
      return res
        .status(httpCodes.UNAUTHORIZED)
        .json({ success: false, message: "No authroization token provided" });
    const checkToken = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
    if (!checkToken)
      return res
        .status(httpCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid authroization token" });
    const getAccount = await AccountDtl.findOne({ _id: checkToken._id });
    req.user = getAccount;
    next();
  } catch (error) {
    return res
      .status(httpCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

module.exports = hasApiAccess;
