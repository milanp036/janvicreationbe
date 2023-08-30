require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("./src/config/connection").connectDb();

const PORT = process.env.PORT || 4000;
app.use(cors("*"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "multipart/form-data" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/v1/api/auth", require("./src/routes/authRoute"));
app.use("/v1/api/customer", require("./src/routes/customerRoute"));
app.use("/v1/api/pdf", require("./src/routes/pdfRoute"));

app.listen(PORT, () => {
  console.log(
    "\x1b[33m Server listening on  http://localhost:%s \x1b[0m",
    PORT
  );
});
