const { downloadFile } = require("../controllers/pdfController");
const hasApiAccess = require("../config/middleware");
const route = require("express").Router();

route.post("/generateBill", hasApiAccess, downloadFile);

module.exports = route;
