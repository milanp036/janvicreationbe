const { httpCodes } = require("../helpers/constant");
const AccountDtl = require("../models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signUp(req, res, next) {
  try {
    const isUserExits = await AccountDtl.findOne({
      email: req.body.email,
    });

    if (isUserExits) {
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ success: false, error: "User already exists" });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    await AccountDtl.create({
      email: req.body.email,
      userType: "USER",
      password,
    });
    return res
      .status(httpCodes.OK)
      .json({ success: true, message: "Account created succesFully" });
  } catch (error) {
    return res
      .status(httpCodes.OK)
      .json({ success: false, error: error.message });
  }
}

async function login(req, res, next) {
  try {
    console.log(req.body);
    const accountExists = await AccountDtl.findOne({
      email: req.body.email,
      isVerified: true,
    });

    if (!accountExists) {
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ success: false, error: "User not found" });
    }
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      accountExists.password
    );
    if (!isPasswordMatched) {
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ success: false, error: "Password not matched" });
    }

    const payload = {
      _id: accountExists._id.toString(),
      email: accountExists.email,
    };
    const accessToken = await generateAccessToken(payload);
    return res.status(httpCodes.OK).send({
      success: true,
      message: "Login successfull",
      data: {
        accessToken,
        account: accountExists,
      },
    });
  } catch (error) {
    return res
      .status(httpCodes.BAD_REQUEST)
      .send({ success: false, error: error.message });
  }
}

async function getUser(req, res, next) {
  try {
    const account = await AccountDtl.findById(req.params.id);
    if (!account) {
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ success: false, error: "User not found" });
    }
    return res.status(httpCodes.OK).json({ success: true, data: account });
  } catch (error) {
    return res
      .status(httpCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
}

async function generateAccessToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });
}

module.exports = {
  signUp,
  login,
  getUser,
};
