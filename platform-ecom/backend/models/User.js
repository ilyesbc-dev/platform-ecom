import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    nom: { type: String, required: [true, 'Le nom est obligatoire'], trim: true },

    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // select: false = la requête NE renvoie PAS le mot de passe, sauf si on le demande exprès.
    // Un compte créé avec Google n'a PAS de mot de passe : il n'est obligatoire que pour les
    // comptes "local" (inscrits avec email + mot de passe).
    password: {
      type: String,
      required: function () {
        return this.provider === 'local'
      },
      minlength: [6, 'Le mot de passe doit faire au moins 6 caractères'],
      select: false,
    },

    // Comment ce compte a été créé : "local" ou "google"
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    googleId: { type: String, default: null },

    // "client" par défaut. On ne devient admin que dans la base (séance suivante)
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
  },
  { timestamps: true }
)

// AVANT chaque sauvegarde : on remplace le mot de passe par son "hash"
userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return
  this.password = await bcrypt.hash(this.password, 10)
})

// Compare le mot de passe tapé avec l'empreinte enregistrée
userSchema.methods.verifierMotDePasse = function (motDePasse) {
  // Compte Google : pas de mot de passe en base, donc jamais valide (et pas de plantage)
  if (!this.password) return false
  return bcrypt.compare(motDePasse, this.password)
}

// Ce qu'on a le droit de renvoyer au navigateur : JAMAIS le mot de passe
userSchema.methods.versPublic = function () {
  return { id: this._id, nom: this.nom, email: this.email, role: this.role }
}

export default mongoose.model('User', userSchema)