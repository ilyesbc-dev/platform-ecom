
import dns from 'dns'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/orders.js'
import uploadRoutes from './routes/upload.js'
import adminUsersRoutes from './routes/adminUsers.js'
import adminStatsRoutes from './routes/adminStats.js'

dotenv.config()

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET manquant dans le fichier .env')
}

dns.setServers(['1.1.1.1'])

mongoose.connect(process.env.MONGODB_URI)
  .then(function () {
    console.log('MongoDB connecté')
  })
  .catch(function (err) {
    console.log('Erreur MongoDB : ' + err.message)
  })

const app = express()

const origines = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: function (origin, callback) {
    // Autoriser les requêtes sans Origin, par exemple certains outils serveur
    if (!origin || origines.includes(origin)) {
      return callback(null, true)
    }

    console.log('Origine CORS refusée :', origin)
    return callback(new Error('Origine non autorisée par CORS'))
  }
}))

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/admin/users', adminUsersRoutes)
app.use('/api/admin/stats', adminStatsRoutes)

app.use('/uploads', express.static('uploads'))

app.get('/', function (req, res) {
  res.json({ message: 'API DZECORM en ligne' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, function () {
  console.log('Serveur démarré sur le port ' + PORT)
})
