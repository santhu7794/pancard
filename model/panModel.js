const mongoose = require("mongoose");
const user = new mongoose.Schema({
  Cardholder: {
    type: String,
  },
  // Category: {
  //   type: String,
  // },
  // fathername: {
  //   type: String,
  // },
  // email: {
  //   type: String,
  // },
  // mobile: {
  //   type: String,
  // },
  image:{
    type:String
  }
});
module.exports = mongoose.model("user", user);
