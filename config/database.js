require("dotenv").config()
const { Sequelize } = require("sequelize")

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: "postgres",
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
          logging: false,
        }
      )
      Database.instance = this
    }
    return Database.instance
  }

  async connect() {
    try {
      await this.sequelize.authenticate()
      console.log("Conexão com o banco de dados estabelecida com sucesso!")
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error)
    }
  }

  static getInstance() {
    if(!Database.instance) {
      new Database()
    }
    return Database.instance.sequelize
  }
}

module.exports = Database