const express = require("express")
const FoodDatabaseController = require("../controllers/FoodDatabaseController")

const router = express.Router()

router.post("/", FoodDatabaseController.createFood)
router.get("/", FoodDatabaseController.getAllFood)
router.get("/:id", FoodDatabaseController.getFoodById)
router.get("/search/:query", FoodDatabaseController.searchFood)
router.put("/:id", FoodDatabaseController.updateFood)
router.delete("/:id", FoodDatabaseController.deleteFood)

module.exports = router