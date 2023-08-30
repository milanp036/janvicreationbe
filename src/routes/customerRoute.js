const route = require("express").Router();

const hasApiAccess = require("../config/middleware");
const {
  createCustomer,
  updateCustomer,
  getCustomer,
  getAllCustomer,
  deleteCustomer,
  getallDeletedCustomer,
  restoreCustomer,
} = require("../controllers/customerController");

route.post("/add", hasApiAccess, createCustomer);
route.put("/update/:id", hasApiAccess, updateCustomer);
route.get("/get/:id", hasApiAccess, getCustomer);
route.get("/getall", hasApiAccess, getAllCustomer);
route.delete("/delete/:id", hasApiAccess, deleteCustomer);
route.get("/getAllDeleted", hasApiAccess, getallDeletedCustomer);
route.get("/restore/:id", hasApiAccess, restoreCustomer);

module.exports = route;
