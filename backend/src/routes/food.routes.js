const express = require("express");
const foodController = require("../controller/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("Video"),
  foodController.createFood
);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood
);

router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);
module.exports = router;
