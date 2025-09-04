const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  video: {
    type: string,
    required: true,
  },
  description: {
    type: string,
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner",
  },
});

const foodModel = mongoose.model("food", foodSchema);
module.exports = foodModel;
