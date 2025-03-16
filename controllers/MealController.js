const { Meal, MealItem } = require('../models')

const MealController = {
    async createMeal(req, res) {
        try {
            const { userId, mealType, date } = req.body

            if(!userId || !mealType || !date) {
                return res.status(400).json({ error: 'Itens obrigatórios faltando' })
            }

            const formattedDate = new Date(date).toISOString().split('T')[0]

            const newMeal = await Meal.create({ 
                user_id: userId, 
                meal_type: mealType, 
                date: formattedDate 
            })
            return res.status(201).json({ message: 'Refeição criada com sucesso', newMeal })
        } catch(error) {
            if(error.name === "SequelizeForeignKeyConstraintError") {
                return res.status(400).json({ error: 'Usuário não encontrado. Verifique o ID informado.' })
            }
            return res.status(400).json({ error: error.message })
        }
    },

    async getMealByUser(req, res) {
        try {
            const userId = Number(req.params.userId)
            if (isNaN(userId)) return res.status(400).json({ error: 'ID do usuário inválido' })
            const meals = await Meal.findAll({ where: { user_id: userId } })
            if(!meals.length) return res.status(404).json({ error: 'Nenhuma refeição encontrada' })
            return res.status(200).json(meals)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async getMealById(req, res) {
        try {
            const { id } = req.params
            const meal = await Meal.findByPk(id)
            if(!meal) return res.status(404).json({ error: 'Dado não encontrado' })    
            return res.status(200).json(meal)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async getMealByDate(req, res) {
        try {
            const { date } = req.params
            if(!date) return res.status(400).json({ error: 'Data não fornecida' })
            
            const formattedDate = new Date(date).toISOString().split('T')[0]
            const meals = await Meal.findAll({ 
                where: { date: formattedDate },
                include: [{ model: MealItem, as: 'items' }]
            })
            
            if(!meals.length) return res.status(404).json({ error: 'Nenhuma refeição encontrada para essa data' })    
            return res.status(200).json(meals)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async updateMeal(req, res) {
        try {
            const { id } = req.params
            const { mealType, date } = req.body
            const meal = await Meal.findByPk(id)
            if(!meal) return res.status(404).json({ error: 'Dado não encontrado' })
            const formattedDate = new Date(date).toISOString().split('T')[0]
            await meal.update({ 
                meal_type: mealType, 
                date: formattedDate 
            })
            return res.status(200).json(meal)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async deleteMeal(req, res) {
        try {
            const { id } = req.params
            const meal = await Meal.findByPk(id)
            if(!meal) return res.status(404).json({ error: 'Dado não encontrado' })    
            await meal.destroy()
            return res.status(200).json({ message: 'Refeição deletada com sucesso' })
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = MealController