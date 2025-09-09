const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );
    const foodItem = await foodModel.create({
      name: req.body.name,
      video: fileUploadResult.url,
      description: req.body.description,
      foodPartner: req.foodPartner._id,
    });
    return res.status(201).json({
      message: "Food item created",
      food: foodItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getFoodItems(req, res) {
  const fooditems = await foodModel.find({});
  res.status(200).json({
    message: "food feched successfully",
    fooditems,
  });
}

module.exports = { createFood, getFoodItems };
