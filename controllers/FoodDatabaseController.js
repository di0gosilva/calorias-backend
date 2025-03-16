const { FoodDatabase } = require('../models')
const axios = require('axios')

const FoodDatabaseController = {
    async createFood(req, res) {
        try {
            const { name, calories, quantity, unit, source } = req.body

            if(!name || !calories || isNaN(calories) || !quantity || isNaN(quantity) || !unit) {
                return res.status(400).json({ error: 'Preencha todos os campos' })
            }

            const newFood = await FoodDatabase.create({ name, calories, quantity, unit, source })
            return res.status(201).json({message: "Alimento cadastrado com sucesso", newFood})
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async searchFood(req, res) {
        try {
            const { query } = req.params
            if(!query) return res.status(400).json({ error: 'Preencha o campo de busca' })
            const apiUrl = ""
            const response = await axios.get(apiUrl)
            if(!response.data.hints || response.data.hints.length === 0) return res.status(404).json({ error: "Nenhum alimento encontrado. Você pode cadastrá-lo manualmente." })
            const foods = response.data.hints.map(item => ({
                name: item.food.label,
                calories: item.food.nutrients.ENERC_KCAL || 0,
                quantity: 100,
                unit: "g",
                source: "api"
            }))
            return res.status(200).json(foods)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async getAllFood(req, res) {
        try {
            const foods = await FoodDatabase.findAll()
            return res.status(200).json(foods)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async getFoodById(req, res) {
        try {
            const { id } = req.params
            const food = await FoodDatabase.findByPk(id)
            if(!food) return res.status(404).json({ error: 'Alimento não encontrado' })
            return res.status(200).json(food)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async updateFood(req, res) {
        try {
            const { id } = req.params
            const { name, calories, quantity, unit, source } = req.body
            const food = await FoodDatabase.findByPk(id)
            if(!food) return res.status(404).json({ error: 'Alimento não encontrado' })    
            await food.update({ name, calories, quantity, unit, source })
            return res.status(200).json(food)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async deleteFood(req, res) {
        try {
            const { id } = req.params
            const food = await FoodDatabase.findByPk(id)
            if(!food) return res.status(404).json({ error: 'Alimento não encontrado' })    
            await food.destroy()
            return res.status(204).json({ message: 'Alimento deletado com sucesso' })
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = FoodDatabaseController