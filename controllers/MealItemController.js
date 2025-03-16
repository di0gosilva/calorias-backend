const { MealItem, Meal, FoodDatabase } = require('../models')

const MealItemController = {
    async addMeal(req, res) {
        try {
            const { mealId, foodId, quantity, unit } = req.body

            if(!mealId || !foodId || !quantity || !unit) {
                return res.status(400).json({ error: 'Parâmetros inválidos' })
            }

            const meal = await Meal.findByPk(mealId)
            if(!meal) return res.status(404).json({ error: 'Refeição não encontrada' })

            const food = await FoodDatabase.findByPk(foodId)
            if(!food) return res.status(404).json({ error: 'Alimento não encontrado' })

            const calories = food.calories * (quantity / 100)

            const mealItem = await MealItem.create({ 
                meal_id: mealId, 
                food_id: foodId, 
                food_name: food.name,
                quantity,
                unit: unit,
                calories })
            return res.status(201).json(mealItem)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async getMealItems(req, res) {
        try {
            const { mealId } = req.params

            if(!mealId) {
                return res.status(400).json({ error: 'Parâmetros inválidos' })
            }

            const items = await MealItem.findAll({
                where: { meal_id: mealId },
                include: [{ 
                    model: FoodDatabase, 
                    as: 'food', 
                    attributes: ['id', 'name', 'calories', 'unit', 'source']
                }],
                attributes: ['id', 'meal_id', 'food_id', 'quantity', 'createdAt', 'updatedAt']
            })

            return res.status(200).json(items)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async updateMealItems(req, res) {
        try {
            const { id } = req.params
            const { quantity } = req.body
            const mealItem = await MealItem.findByPk(id, { include: [{ model: FoodDatabase, as: 'food' }] })

            if(!mealItem) return res.status(404).json({ error: 'Item de refeição não encontrado' })

            if(!mealItem.food || !mealItem.food.calories) {
                return res.status(400).json({ error: 'Alimento não encontrado' })
            }

            const calories = (mealItem.food.calories * quantity) / 100
            await mealItem.update({ quantity, calories })
            return res.status(200).json(mealItem)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async deleteMealItems(req, res) {
        try {
            const { id } = req.params
            const mealItem = await MealItem.findByPk(id)
            if(!mealItem) return res.status(404).json({ error: 'Item de refeição não encontrado' })    
            await mealItem.destroy()
            return res.status(200).json({ message: 'Item de refeição excluído com sucesso' })
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = MealItemController