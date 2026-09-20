import express from 'express'
import mongoose from 'mongoose'
import Product from '../models/Product.js'

const router = express.Router()

router.get('/', async function (req, res) {
  try {
    const produits = await Product.find().sort({ createdAt: 1 })
    res.json(produits)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async function (req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }

    const produit = await Product.findById(req.params.id)

    if (!produit) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }

    res.json(produit)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router