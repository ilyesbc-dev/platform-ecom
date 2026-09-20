import dns from 'dns'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoutes from './routes/products.js'

dotenv.config()

dns.setServers(['1.1.1.1'])
mongoose.connect(process.env.MONGODB_URI)
  .then(function () {
    console.log('MongoDB connecté')
  })
  .catch(function (err) {
    console.log('Erreur : ' + err.message)
  })

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/products', productRoutes)

app.get('/', function (req, res) {
  res.json({ message: 'API DZECORM en ligne' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, function () {
  console.log('Serveur sur http://localhost:' + PORT)
})

