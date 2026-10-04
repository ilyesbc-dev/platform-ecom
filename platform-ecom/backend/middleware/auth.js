import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// protect = « QUI ES-TU ? »   →  401 si on ne sait pas
export async function protect(req, res, next) {
  const entete = req.headers.authorization || ''
  const token = entete.startsWith('Bearer ') ? entete.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Connexion requise' })
  }

  try {
    const contenu = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(contenu.id)
    if (!user) {
      return res.status(401).json({ message: 'Compte introuvable' })
    }

    req.user = user
    next()
  } catch (erreur) {
    res.status(401).json({ message: 'Token invalide ou expiré' })
  }
}

// isAdmin = « AS-TU LE DROIT ? »   →  403 si non. À placer APRÈS protect.
export function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès réservé à l'admin" })
  }
  next()
}