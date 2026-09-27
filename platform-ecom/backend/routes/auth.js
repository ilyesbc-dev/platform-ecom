import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

function creerToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// INSCRIPTION  →  POST /api/auth/register
router.post('/register', async function (req, res) {
  try {
    // On prend les 3 champs autorisés UN PAR UN. Jamais User.create(req.body) :
    // sinon un visiteur pourrait envoyer "role": "admin" et devenir admin en 2 secondes !
    const { nom, email, password } = req.body

    if (!nom || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe obligatoires' })
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit faire au moins 6 caractères' })
    }

    const existe = await User.findOne({ email: String(email).toLowerCase().trim() })
    if (existe) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' })
    }

    const user = await User.create({ nom, email, password: String(password) })

    res.status(201).json({ token: creerToken(user), user: user.versPublic() })
  } catch (erreur) {
    res.status(400).json({ message: erreur.message })
  }
})

// CONNEXION  →  POST /api/auth/login
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: String(email || '').toLowerCase().trim() }).select('+password')

    // Même message si l'email n'existe pas OU si le mot de passe est faux
    if (!user || !(await user.verifierMotDePasse(String(password || '')))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    res.json({ token: creerToken(user), user: user.versPublic() })
  } catch (erreur) {
    res.status(500).json({ message: erreur.message })
  }
})

// QUI SUIS-JE ?  →  GET /api/auth/me
router.get('/me', protect, function (req, res) {
  res.json({ user: req.user.versPublic() })
})

export default router