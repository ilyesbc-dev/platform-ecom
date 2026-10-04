import express from 'express'
import mongoose from 'mongoose'
import Product from '../models/Product.js'
import { protect, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// Les champs qu'on accepte du navigateur : choisis UN PAR UN.
// (jamais Product.create(req.body) tout court : on ne fait pas confiance au réseau)
function champsAutorises(body) {
  return {
    nom: body.nom,
    description: body.description,
    prix: body.prix,
    categorie: body.categorie,
    stock: body.stock,
    image: body.image,
  }
}

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

// CRÉER un produit  (POST /api/products) — ADMIN SEULEMENT
router.post('/', protect, isAdmin, async function (req, res) {
  try {
    const nouveau = await Product.create(champsAutorises(req.body))
    res.status(201).json(nouveau)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// MODIFIER un produit  (PUT /api/products/:id) — ADMIN SEULEMENT
router.put('/:id', protect, isAdmin, async function (req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }
    const produit = await Product.findByIdAndUpdate(req.params.id, champsAutorises(req.body), {
      returnDocument: 'after',
      runValidators: true,
    })
    if (!produit) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }
    res.json(produit)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// SUPPRIMER un produit  (DELETE /api/products/:id) — ADMIN SEULEMENT
router.delete('/:id', protect, isAdmin, async function (req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }
    const produit = await Product.findByIdAndDelete(req.params.id)
    if (!produit) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }
    res.json({ message: 'Produit supprimé' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router