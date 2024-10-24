const mongoose = require("mongoose");

require("dotenv");

const mongodb_connection_string = process.env.mongodb_url;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb_connection_string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
