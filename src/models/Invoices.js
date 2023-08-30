const { model, Schema } = require("mongoose");

const InvoiceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "AccountDtl",
      required: true,
    },
    invoiceNo: { type: String, required: true },
    invoiceDate: { type: Date, required: true },
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    productQty: { type: String, required: true },
    productPrice: { type: String, required: true },
    gstPercentage: { type: String, required: true },
    subTotal: { type: String, required: true },
    cGsT: { type: String, required: true },
    sGsT: { type: String, required: true },
    total: { type: String, required: true },
    note: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Invoices = model("Invoices", InvoiceSchema);

module.exports = Invoices;
