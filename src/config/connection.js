const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("\x1b[33m Database connected successfully \x1b[0m");
  } catch (error) {
    console.log("\x1b[33m Database connection failed \x1b[0m", error);
  }
};

module.exports = { connectDb };
