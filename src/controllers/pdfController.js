const ejs = require("ejs");
const puppeteer = require("puppeteer");
const path = require("path");
const Customers = require("../models/Customer");
const converter = require("number-to-words");
const moment = require("moment");

async function downloadFile(req, res) {
  try {
    console.log("req", req.body);
    const customer = await Customers.findOne({ _id: req.body.firmName });
    let data = req.body;

    data.date = moment(data.date).format("DD/MM/YYYY");
    data.total = parseFloat(data.total).toFixed(2);
    data.cgst = parseFloat(data.cgst).toFixed(2);
    data.sgst = parseFloat(data.sgst).toFixed(2);
    data.subTotal = parseFloat(data.subTotal).toFixed(2);
    data.rate = parseFloat(data.rate).toFixed(2);

    let gstInPer = parseFloat(data.gstPercentage / 2).toFixed(2);
    let totalWords = converter.toWords(data.total);
    let word = Number(data.cgst) + Number(data.sgst);
    console.log("word, word", word);
    let gstWords = converter.toWords(word);

    const options = { format: "A4" };

    const filepath = path.join(__dirname, "../helpers/templates/invoice.ejs");
    let html = await ejs.renderFile(filepath, {
      data,
      customer,
      gstWords,
      totalWords,
      gstInPer,
    });

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "a4", // Page format
      margin: {
        right: "1cm",
        left: "1cm",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${customer.firmName}-${data.date}.pdf`
    );
    res.send(pdfBuffer);
    // pdf.create(html, options).toBuffer((err, buffer) => {
    //   if (err) return console.error(err);
    //   res.setHeader("Content-Type", "application/pdf");
    //   res.setHeader(
    //     "Content-Disposition",
    //     `attachment; filename=${customer.firmName}-${data.date}.pdf`
    //   );
    //   res.send(buffer);
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error });
  }
}

module.exports = {
  downloadFile,
};
