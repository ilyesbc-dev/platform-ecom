import express from 'express'
import User from '../models/User.js'
import Order from '../models/Order.js'
import { protect, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// TOUTES les routes de ce fichier sont réservées à l'admin
router.use(protect, isAdmin)

// LISTE DES UTILISATEURS  →  GET /api/admin/users
router.get('/', async function (req, res) {
  try {
    const utilisateurs = await User.find().sort({ createdAt: -1 }).lean()

    const resultat = await Promise.all(
      utilisateurs.map(async function (u) {
        const commandes = await Order.find({ user: u._id }).lean()
        const total = commandes
          .filter(function (c) { return c.statut === 'Livrée' })
          .reduce(function (somme, c) { return somme + c.total }, 0)

        return {
          _id: u._id,
          nom: u.nom,
          email: u.email,
          role: u.role,
          status: u.status,
          provider: u.provider,
          nbCommandes: commandes.length,
          totalDepense: total,
        }
      })
    )

    res.json(resultat)
  } catch (erreur) {
    res.status(500).json({ message: erreur.message })
  }
})

// CHANGER LE STATUT (bloquer/débloquer)  →  PATCH /api/admin/users/:id/status
router.patch('/:id/status', async function (req, res) {
  try {
    const { status } = req.body

    if (status !== 'actif' && status !== 'bloque') {
      return res.status(400).json({ message: 'Statut invalide' })
    }

    // Garde-fou : un admin ne peut pas se bloquer lui-même (et rester enfermé dehors)
    if (String(req.params.id) === String(req.user._id)) {
      return res.status(400).json({ message: 'Tu ne peux pas modifier ton propre compte' })
    }

    const user = await User.findByIdAndUpdate(req.params.id, { status: status }, { returnDocument: 'after' })
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' })
    }

    res.json({ _id: user._id, status: user.status })
  } catch (erreur) {
    res.status(500).json({ message: erreur.message })
  }
})

// CHANGER LE RÔLE  →  PATCH /api/admin/users/:id/role
router.patch('/:id/role', async function (req, res) {
  try {
    const { role } = req.body

    if (role !== 'client' && role !== 'admin') {
      return res.status(400).json({ message: 'Rôle invalide' })
    }

    // Garde-fou : un admin ne peut pas changer son propre rôle
    // (sinon il pourrait se retirer les droits admin par erreur et se bloquer dehors)
    if (String(req.params.id) === String(req.user._id)) {
      return res.status(400).json({ message: 'Tu ne peux pas modifier ton propre compte' })
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role: role }, { returnDocument: 'after' })
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' })
    }

    res.json({ _id: user._id, role: user.role })
  } catch (erreur) {
    res.status(500).json({ message: erreur.message })
  }
})

export default router