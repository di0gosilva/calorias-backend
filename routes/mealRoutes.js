const express = require('express')
const MealController = require('../controllers/MealController')
const authMiddleware = require('../middlewares/authMiddleware')
const authorizationMiddleware = require('../middlewares/authorizationMiddleware')

const router = express.Router()

router.post("/", authMiddleware, MealController.createMeal)
router.get("/meal/:id", authMiddleware, MealController.getMealById)
router.get("/date/:date", authMiddleware, MealController.getMealByDate)
router.get("/:userId", authMiddleware, authorizationMiddleware, MealController.getMealByUser)
router.put("/:id", authMiddleware, MealController.updateMeal)
router.delete("/:id", authMiddleware, MealController.deleteMeal)

module.exports = router