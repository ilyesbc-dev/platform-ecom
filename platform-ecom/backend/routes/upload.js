import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { protect, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// Le fichier reste en mémoire (buffer) le temps de l'envoyer où on veut.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 Mo maximum
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Seules les images sont acceptées'))
    }
    cb(null, true)
  },
})

// Envoi vers Cloudinary (utilisé EN LIGNE : le disque de Render est effacé à chaque déploiement).
// cloudinary lit tout seul la variable CLOUDINARY_URL.
function envoyerVersCloudinary(buffer) {
  return new Promise(function (resolve, reject) {
    const flux = cloudinary.uploader.upload_stream({ folder: 'dzecorm' }, function (erreur, resultat) {
      if (erreur) reject(erreur)
      else resolve(resultat)
    })
    flux.end(buffer)
  })
}

// ENVOYER UNE IMAGE  →  POST /api/upload   (admin seulement)
router.post('/', protect, isAdmin, upload.single('image'), async function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucune image envoyée' })
    }

    // 1) EN LIGNE : si CLOUDINARY_URL existe, on envoie chez Cloudinary
    if (process.env.CLOUDINARY_URL) {
      const resultat = await envoyerVersCloudinary(req.file.buffer)
      return res.status(201).json({ imageUrl: resultat.secure_url })
    }

    // 2) EN LOCAL : on écrit dans le dossier uploads/
    fs.mkdirSync('uploads', { recursive: true })
    const nom = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(req.file.originalname)
    fs.writeFileSync(path.join('uploads', nom), req.file.buffer)

    res.status(201).json({ imageUrl: req.protocol + '://' + req.get('host') + '/uploads/' + nom })
  } catch (erreur) {
    res.status(500).json({ message: erreur.message })
  }
})

// Erreurs de multer (fichier trop gros, pas une image...) : message clair en JSON
router.use(function (erreur, req, res, next) {
  res.status(400).json({ message: erreur.message })
})

export default router