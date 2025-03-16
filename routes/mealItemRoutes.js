const express = require("express")
const MealItemController = require("../controllers/MealItemController")

const router = express.Router()

router.post("/", MealItemController.addMeal)
router.get("/:mealId", MealItemController.getMealItems)
router.put("/:id", MealItemController.updateMealItems)
router.delete("/:id", MealItemController.deleteMealItems)

module.exports = router