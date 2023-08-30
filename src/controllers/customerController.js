const { httpCodes } = require("../helpers/constant");
const Customers = require("../models/Customer");

async function createCustomer(req, res, next) {
  try {
    const customer = await Customers.create(req.body);
    return res.status(httpCodes.CREATED).json({
      success: true,
      message: "Customer create successFully",
      data: customer,
    });
  } catch (error) {
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
}

async function updateCustomer(req, res, next) {
  try {
    console.log(req.params.id);
    delete req.body._id;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.isDeleted;
    console.log("req.body", req.body);
    console.log("req.params.id", req.params.id);
    const customer = await Customers.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    return res.status(httpCodes.OK).json({
      success: true,
      message: "Customer update Succesfully",
      data: customer,
    });
  } catch (error) {
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
}

async function getCustomer(req, res, next) {
  try {
    const customer = await Customers.findOne({ _id: req.params.id });
    return res.status(httpCodes.OK).json({
      success: true,
      message: "Customer get Succesfully",
      data: customer,
    });
  } catch (error) {
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
}

async function getAllCustomer(req, res, next) {
  try {
    const customers = await Customers.find({ isDeleted: false }).sort({
      firmName: 1,
    });
    return res.status(httpCodes.OK).json({
      success: true,
      message: "Customer get Succesfully",
      data: customers,
    });
  } catch (error) {
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
}

async function deleteCustomer(req, res, next) {
  try {
    const customer = await Customers.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isDeleted: true,
        },
      }
    );
    return res.status(httpCodes.OK).json({
      success: true,
      message: "Customer delete Succesfully",
      data: customer,
    });
  } catch (error) {
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
}

async function getallDeletedCustomer(req, res, next) {
  try {
    const customers = await Customers.find({ isDeleted: true });
    return res.status(httpCodes.OK).json({
      success: true,
      message: "Customer get Succesfully",
      data: customers,
    });
  } catch (error) {
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
}

async function restoreCustomer(req, res, next) {
  try {
    const customer = await Customers.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isDeleted: false,
        },
      }
    );
    return res.status(httpCodes.OK).json({
      success: true,
      message: "Customer restore Succesfully",
      data: customer,
    });
  } catch (error) {
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
}

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomer,
  getAllCustomer,
  deleteCustomer,
  getallDeletedCustomer,
  restoreCustomer,
};
