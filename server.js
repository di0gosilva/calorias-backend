require("dotenv").config()
const cors = require("cors")
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
app.use(
    cors({
        origin: ["http://localhost:3000", "https://calorias-frontend.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
)

if(process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        if(req.headers["x-forwarded-proto"] !== "https") {
            return res.redirect(`https://${req.headers.host}${req.url}`)
        }
        next()
    })
}

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
