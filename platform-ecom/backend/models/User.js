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

    // Obligatoire seulement pour les comptes "local" : un compte Google n'a pas de mot de passe
    password: {
      type: String,
      required: function () {
        return this.provider === 'local'
      },
      minlength: [6, 'Le mot de passe doit faire au moins 6 caractères'],
      select: false,
    },

    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    googleId: { type: String, default: null },

    // "client" par défaut. On ne devient admin que dans la base (cette étape)
    role: { type: String, enum: ['client', 'admin'], default: 'client' },

    // Un admin peut bloquer un compte : un client bloqué ne peut plus se connecter
    status: { type: String, enum: ['actif', 'bloque'], default: 'actif' },
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.verifierMotDePasse = function (motDePasse) {
  if (!this.password) return false
  return bcrypt.compare(motDePasse, this.password)
}

userSchema.methods.versPublic = function () {
  return { id: this._id, nom: this.nom, email: this.email, role: this.role }
}

export default mongoose.model('User', userSchema)