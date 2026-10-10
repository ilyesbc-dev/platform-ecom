// Utilisation (depuis le dossier backend) :  node makeAdmin.js email@exemple.com
// Le compte doit déjà exister : inscris-toi d'abord sur le site. Personne ne peut se
// choisir "admin" depuis le site (c'est voulu) : on le fait ici, directement dans la base.

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const email = (process.argv[2] || '').trim().toLowerCase()

if (!email) {
  console.log('Utilisation : node makeAdmin.js email@exemple.com')
  process.exit(1)
}

try {
  await mongoose.connect(process.env.MONGODB_URI)

  const user = await User.findOneAndUpdate({ email: email }, { role: 'admin' }, { returnDocument: 'after' })

  if (!user) {
    console.log("Aucun compte avec l'email " + email + ". Inscris-toi d'abord sur le site.")
  } else {
    console.log(user.nom + ' (' + user.email + ') est maintenant admin.')
  }
} catch (erreur) {
  console.log('Erreur : ' + erreur.message)
} finally {
  await mongoose.disconnect()
}