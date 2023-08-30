const { model, Schema } = require("mongoose");

const AccountDtlSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isVerified: { type: Boolean, default: false },
    userType: { type: String, default: "user", enum: ["USER", "ADMIN"] },
  },
  { timestamps: true }
);

const AccountDtl = model("AccountDtl", AccountDtlSchema);

module.exports = AccountDtl;
