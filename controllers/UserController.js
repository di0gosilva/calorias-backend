const { User } = require('../models')
const { generateToken, hashPassword, comparePassword } = require('../utils/auth')
const { OAuth2Client } = require("google-auth-library")

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const UserController = {
    async createUser(req, res) {
        try {
            let { name, email, password, provider, provider_id } = req.body

            if(!name || !email) {
                return res.status(400).json({ error: 'Nome e email são obrigatórios.' })
            }

            const existingUser = await User.findOne({ where: { email } })
            if(existingUser) return res.status(400).json({ error: 'Email já cadastrado.' })

            if(!provider) {
                provider = "local"
                provider_id = email
            }

            if(provider === "local") {
                if(!password) return res.status(400).json({ error: 'Senha é obrigatória.' })
                password = await hashPassword(password)
            }

            const user = await User.create({ name, email, password, provider, provider_id })
            const token = generateToken({ id: user.id })
            return res.status(201).json({ message: "Usuário cadastrado com sucesso.", token })
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body
            if(!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios.' })

            const user = await User.findOne({ where: { email } })
            if(!user) return res.status(404).json({ error: 'Usuário não encontrado.' })

            if(!user.provider) {
                user.provider = "local"
            }
            
            if(user.provider !== "local") return res.status(400).json({ error: "Faça login com seu provedor de autenticação."})

            const isPasswordValid = await comparePassword(password, user.password)
            if(!isPasswordValid) return res.status(400).json({ error: 'Senha inválida.' })
            
            const token = generateToken({ id: user.id })
            return res.status(200).json({ message: "Login realizado com sucesso.", user, token })
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async oauthLogin(req, res) {
        console.log("Requisição recebida no /oauth:", req.body);
        try {
            const { tokenId } = req.body
            if(!tokenId) return res.status(400).json({ error: "Token de autenticação inválido." })
            
            console.log("Token recebido:", tokenId)

            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            })

            const payload = ticket.getPayload()
            if(!payload) return res.status(400).json({ error: "Erro ao validar token do Google." })
            
            console.log("Payload recebido:", payload);

            const { sub: provider_id, name, email, picture: avatar } = payload
            const provider = "google"
        
            let user = await User.findOne({ where: { provider, provider_id }})
            if(!user) {
                user = await User.create({
                    name, 
                    email,
                    provider,
                    provider_id,
                    profile_picture: avatar,
                })
            }

            const token = generateToken({ id: user.id })

            console.log("Usuário autenticado com sucesso:", user);

            return res.status(200).json({ message: "Login OAuth realizado com sucesso.", user, token })        
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll()
            return res.status(200).json(users)
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async getUserById(req, res) {
        try {
            const { id } = req.params
            const user = await User.findByPk(id)
            if(!user) return res.status(404).json({ error: 'Usuário não encontrado' })    
            return res.status(200).json({ user })
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params
            const { name, password } = req.body
            const user = await User.findByPk(id)
            if(!user) return res.status(404).json({ error: 'Usuário não encontrado' })    
            await user.update({ name, password })
            return res.status(200).json({ message: "Usuário atualizado com sucesso."})
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params
            const user = await User.findByPk(id)
            if(!user) return res.status(404).json({ error: 'Usuário não encontrado' })    
            await user.destroy()
            return res.status(200).json({ message: "Usuário deletado com sucesso."})
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async updateProfilePicture(req, res) {
        try {
            const { id } = req.params
            const { profile_picture } = req.body
            const user = await User.findByPk(id) 
            if(!user) return res.status(404).json({ error: 'Usuário não encontrado' })
            await user.update({ profile_picture })
            return res.status(200).json({ message: "Imagem de perfil atualizada com sucesso."})
        } catch(error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = UserController