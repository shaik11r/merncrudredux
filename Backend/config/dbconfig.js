const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToDatabase;
