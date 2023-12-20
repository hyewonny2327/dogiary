const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController.js");
const authenticateUser = require("../middlewares/authenticateUser.js");

// POST
router.post("/:id/foods", authenticateUser, foodController.postFood);

// GET:
router.get("/:id/foods", authenticateUser, foodController.getFoodById);

// PUT:
router.put("/:id/foods/:foodId", authenticateUser, foodController.putFood);

// DELETE:
router.delete(
	"/:id/foods/:foodId",
	authenticateUser,
	foodController.deleteFood
);
module.exports = router;
