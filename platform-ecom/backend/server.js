import dns from 'dns'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/orders.js'

dotenv.config()

// Sans phrase secrète, on ne démarre pas : mieux vaut planter que d'être vulnérable
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET manquant dans le fichier .env')
}

dns.setServers(['1.1.1.1'])
mongoose.connect(process.env.MONGODB_URI)
  .then(function () {
    console.log('MongoDB connecté')
  })
  .catch(function (err) {
    console.log('Erreur : ' + err.message)
  })

const app = express()

// Qui a le droit d'appeler l'API depuis un navigateur ?
// En local : Vite (port 5173). En ligne : l'adresse de ton site (variable FRONTEND_URL).
const origines = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean)
app.use(cors({ origin: origines }))
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', function (req, res) {
  res.json({ message: 'API DZECORM en ligne' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, function () {
  console.log('Serveur sur http://localhost:' + PORT)
})cd platform-ecom/backend