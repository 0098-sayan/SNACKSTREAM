const mongoose = require("mongoose");

function connectdb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Mongodb connected Successfully");
    })
    .catch((err) => {
      console.log("mongodb concetion error", err);
    });
}

module.exports = connectdb;