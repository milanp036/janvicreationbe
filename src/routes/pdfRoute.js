const { downloadFile } = require("../controllers/pdfController");

const route = require("express").Router();

route.post("/generateBill", downloadFile);

module.exports = route;
