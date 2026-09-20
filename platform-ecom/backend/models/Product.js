import mongoose from 'mongoose'

const schema = new mongoose.Schema({

  nom: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    default: ''
  },

  prix: {
    type: Number,
    required: true,
    min: 0
  },

  categorie: {
    type: String,
    default: 'Divers'
  },

  stock: {
    type: Number,
    default: 0,
    min: 0
  },

  image: {
    type: String,
    default: ''
  }

}, {
  timestamps: true
})

export default mongoose.model('Product', schema)