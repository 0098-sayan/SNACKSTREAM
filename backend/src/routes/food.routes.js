const express = require("express");
const foodController = require("../controller/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer")
const router = express.Router();

const upload = multer({
    storage:multer.memoryStorage(),
})

router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("Video"),
  foodController.createFood
);

module.exports = router;
