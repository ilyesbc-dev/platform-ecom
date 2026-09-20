import dns from 'dns'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

dns.setServers(['1.1.1.1'])

const produits = [
  {
    "nom": "T-shirt",
    "description": "T-shirt confortable en coton",
    "prix": 899,
    "categorie": "Vêtements",
    "stock": 20,
    "image": "/images/t-shirt.png"
  },
  {
    "nom": "Basket",
    "description": "Baskets modernes et confortables",
    "prix": 599,
    "categorie": "Chaussures",
    "stock": 20,
    "image": "/images/shoes-for-men.png"
  },
  {
    "nom": "Jeans",
    "description": "Jeans moderne et élégant",
    "prix": 1999,
    "categorie": "Vêtements",
    "stock": 20,
    "image": "/images/jeans.png"
  },
  {
    "nom": "Casquette",
    "description": "Casquette homme noire",
    "prix": 799,
    "categorie": "Accessoires",
    "stock": 20,
    "image": "/images/casquette-homme-noir.png"
  },
  {
    "nom": "Lunettes",
    "description": "Lunettes modernes",
    "prix": 1299,
    "categorie": "Accessoires",
    "stock": 20,
    "image": "/images/lunettes.png"
  },
  {
    "nom": "Sweat-shirt",
    "description": "Sweat-shirt confortable",
    "prix": 2499,
    "categorie": "Vêtements",
    "stock": 20,
    "image": "/images/sweat-shirt.png"
  },
  {
    "nom": "Veste",
    "description": "Veste élégante et moderne",
    "prix": 3499,
    "categorie": "Vêtements",
    "stock": 20,
    "image": "/images/veste.png"
  },
  {
    "nom": "Adidas",
    "description": "Chaussures Adidas",
    "prix": 5999,
    "categorie": "Chaussures",
    "stock": 20,
    "image": "/images/adidas.png"
  },
  {
    "nom": "Laptop Rucksack",
    "description": "Sac à dos pour ordinateur portable",
    "prix": 2999,
    "categorie": "Accessoires",
    "stock": 20,
    "image": "/images/laptop-rucksack.png"
  },
  {
    "nom": "Montre",
    "description": "Montre élégante",
    "prix": 3999,
    "categorie": "Accessoires",
    "stock": 20,
    "image": "/images/montre.png"
  }
]

try {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté')

  await Product.deleteMany({})
  const ajoutes = await Product.insertMany(produits)

  console.log(ajoutes.length + ' produits importés avec succès')
} catch (err) {
  console.log('Erreur : ' + err.message)
} finally {
  await mongoose.disconnect()
}