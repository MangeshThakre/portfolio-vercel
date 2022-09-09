require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB)
  .then(console.log("successfuly connected to db"))
  .catch((err) => {
    console.log("err", err);
  });

module.exports = mongoose;
