const { model, Schema } = require("mongoose");

const CustomerSchema = new Schema(
  {
    firmName: { type: String, require: true },
    gstNo: { type: String, require: true },
    customerName: { type: String, require: true },
    address: { type: String, require: true },
    mobileNo: { type: String, require: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Customers = model("Customer", CustomerSchema);

module.exports = Customers;
