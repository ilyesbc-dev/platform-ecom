import express from 'express'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
import { protect, isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.use(protect, isAdmin)

const JOURS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

// STATISTIQUES DU TABLEAU DE BORD  →  GET /api/admin/stats
router.get('/', async function (req, res) {
  try {
    const [nbClients, nbProduits, commandes, stockFaible] = await Promise.all([
      User.countDocuments({ role: 'client' }),
      Product.countDocuments(),
      Order.find().sort({ createdAt: -1 }),
      Product.find({ stock: { $lte: 5 } }).select('nom stock').sort({ stock: 1 }),
    ])

    // Règle de gestion : le chiffre d'affaires ne compte que les commandes LIVRÉES
    // (une commande "En attente" peut encore être annulée : ce n'est pas encore de l'argent encaissé)
    const livrees = commandes.filter(function (c) { return c.statut === 'Livrée' })
    const chiffreAffaires = livrees.reduce(function (somme, c) { return somme + c.total }, 0)

    // Ventes des 7 derniers jours (pour le graphique)
    const ventes7j = []
    for (let i = 6; i >= 0; i--) {
      const debut = new Date()
      debut.setHours(0, 0, 0, 0)
      debut.setDate(debut.getDate() - i)
      const fin = new Date(debut)
      fin.setDate(fin.getDate() + 1)

      const ventes = livrees
        .filter(function (c) { return c.createdAt >= debut && c.createdAt < fin })
        .reduce(function (somme, c) { return somme + c.total }, 0)

      ventes7j.push({ jour: JOURS[debut.getDay()], ventes: ventes })
    }

    // Produits les plus vendus (parmi les commandes livrées)
    const parProduit = {}
    livrees.forEach(function (commande) {
      commande.articles.forEach(function (ligne) {
        const cle = String(ligne.produit)
        if (!parProduit[cle]) parProduit[cle] = { nom: ligne.nom, quantite: 0 }
        parProduit[cle].quantite += ligne.quantite
      })
    })
    const topProduits = Object.values(parProduit)
      .sort(function (a, b) { return b.quantite - a.quantite })
      .slice(0, 5)

    res.json({
      chiffreAffaires: chiffreAffaires,
      nbCommandes: commandes.length,
      enAttente: commandes.filter(function (c) { return c.statut === 'En attente' }).length,
      nbClients: nbClients,
      nbProduits: nbProduits,
      ventes7j: ventes7j,
      topProduits: topProduits,
      stockFaible: stockFaible,
      dernieresCommandes: commandes.slice(0, 5),
    })
  } catch (erreur) {
    res.status(500).json({ message: erreur.message })
  }
})

export default router