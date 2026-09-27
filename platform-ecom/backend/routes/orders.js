import express from 'express'
import mongoose from 'mongoose'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { protect } from '../middleware/auth.js'

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

    // Le navigateur envoie SEULEMENT { produit: _id, quantite }.
    // Les PRIX, on va les chercher NOUS-MÊMES dans la base : on ne fait jamais
    // confiance à ce qui vient du réseau (le prix pourrait être modifié dans F12).
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

    // On retire les articles vendus du stock
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

export default router