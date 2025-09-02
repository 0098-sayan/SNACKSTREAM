const mongoose = require("mongoose");

function connectdb() {
  mongoose
    .connect("mongodb://localhost:27017/snackstream")
    .then(() => {
      console.log("Mongodb connected Successfully");
    })
    .catch((err) => {
      console.log("mongodb concetion error", err);
    });
}

module.exports = connectdb;