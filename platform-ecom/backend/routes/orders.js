import express from 'express'
import mongoose from 'mongoose'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { protect, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// PASSER UNE COMMANDE  →  POST /api/orders   (connecté)
router.post('/', protect, async function (req, res) {
  try {
    const { articles, telephone, wilaya, adresse } = req.body

    if (!Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide' })
    }
    if (!telephone || !wilaya || !adresse) {
      return res.status(400).json({ message: 'Téléphone, wilaya et adresse obligatoires' })
    }

    const ids = articles.map(function (a) {
      return String(a.produit)
    })
    if (!ids.every(mongoose.isValidObjectId)) {
      return res.status(400).json({ message: 'Produit invalide' })
    }
    const produits = await Product.find({ _id: { $in: ids } })

    let total = 0
    const lignes = []

    for (const article of articles) {
      const produit = produits.find(function (p) {
        return String(p._id) === String(article.produit)
      })
      const quantite = Number(article.quantite)

      if (!produit) {
        return res.status(400).json({ message: 'Produit introuvable' })
      }
      if (!Number.isInteger(quantite) || quantite < 1 || quantite > 99) {
        return res.status(400).json({ message: 'Quantité invalide pour ' + produit.nom })
      }
      if (quantite > produit.stock) {
        return res.status(400).json({ message: 'Stock insuffisant pour ' + produit.nom })
      }

      total += produit.prix * quantite
      lignes.push({ produit: produit._id, nom: produit.nom, prix: produit.prix, quantite: quantite })
    }

    const commande = await Order.create({
      user: req.user._id,
      client: req.user.nom,
      articles: lignes,
      total: total,
      telephone: telephone,
      wilaya: wilaya,
      adresse: adresse,
    })

    for (const ligne of lignes) {
      await Product.updateOne({ _id: ligne.produit }, { $inc: { stock: -ligne.quantite } })
    }

    res.status(201).json(commande)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// MES COMMANDES  →  GET /api/orders/my   (connecté)
router.get('/my', protect, async function (req, res) {
  try {
    const commandes = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(commandes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// TOUTES LES COMMANDES  →  GET /api/orders   (admin)
router.get('/', protect, isAdmin, async function (req, res) {
  try {
    const commandes = await Order.find().sort({ createdAt: -1 })
    res.json(commandes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// CHANGER LE STATUT D'UNE COMMANDE  →  PATCH /api/orders/:id/statut   (admin)
const STATUTS_VALIDES = ['En attente', 'Expédiée', 'Livrée', 'Annulée']

router.patch('/:id/statut', protect, isAdmin, async function (req, res) {
  try {
    const { statut } = req.body

    if (!STATUTS_VALIDES.includes(statut)) {
      return res.status(400).json({ message: 'Statut invalide' })
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Commande introuvable' })
    }

    const commande = await Order.findByIdAndUpdate(req.params.id, { statut: statut }, { returnDocument: 'after' })
    if (!commande) {
      return res.status(404).json({ message: 'Commande introuvable' })
    }
    res.json(commande)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router