require("dotenv").config()
const express = require("express")
const Database = require("./config/database")

const rateLimiter = require("./middlewares/rateLimiter")
const errorHandler = require("./middlewares/errorHandler")

const userRoutes = require("./routes/userRoutes")
const mealRoutes = require("./routes/mealRoutes")
const mealItemRoutes = require("./routes/mealItemRoutes")
const foodDatabaseRoutes = require("./routes/foodDatabaseRoutes")

const app = express()

app.use(rateLimiter)
app.use(express.json())

const database = new Database()
database.connect().then(() => {
    app.use("/api/users", userRoutes)
    app.use("/api/meals", mealRoutes)
    app.use("/api/meal-items", mealItemRoutes)
    app.use("/api/foods", foodDatabaseRoutes)
    
    app.use(errorHandler)
    
    const port = process.env.PORT || 4000
    app.listen(port, () => {
        console.log(`Servidor rodando na porta localhost:${port}`)
    })
})
