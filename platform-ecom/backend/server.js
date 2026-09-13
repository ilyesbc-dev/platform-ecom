import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// PRODUCTS
// ===============================

let produits = [
  {
    id: 1,
    nom: "T-shirt",
    description: "T-shirt confortable en coton",
    prix: 899,
    categorie: "Vêtements"
  },
  {
    id: 2,
    nom: "Basket",
    description: "Baskets modernes et confortables",
    prix: 599,
    categorie: "Vêtements"
  },
  {
    id: 3,
    nom: "Jeans",
    description: "Jeans moderne et élégant",
    prix: 1999,
    categorie: "Vêtements"
  },
  {
    id: 4,
    nom: "Casquette",
    description: "Casquette homme noire",
    prix: 799,
    categorie: "Accessoires"
  },
  {
    id: 5,
    nom: "Lunettes",
    description: "Lunettes modernes",
    prix: 1299,
    categorie: "Accessoires"
  },
  {
    id: 6,
    nom: "Sweat-shirt",
    description: "Sweat-shirt confortable",
    prix: 2499,
    categorie: "Vêtements"
  },
  {
    id: 7,
    nom: "Veste",
    description: "Veste élégante et moderne",
    prix: 3499,
    categorie: "Vêtements"
  },
  {
    id: 8,
    nom: "Adidas",
    description: "Chaussures Adidas",
    prix: 5999,
    categorie: "Chaussures"
  },
  {
    id: 9,
    nom: "Laptop Rucksack",
    description: "Sac à dos pour ordinateur portable",
    prix: 2999,
    categorie: "Accessoires"
  },
  {
    id: 10,
    nom: "Montre",
    description: "Montre élégante",
    prix: 3999,
    categorie: "Accessoires"
  }
];

// ===============================
// ROUTES
// ===============================

// HOME
app.get("/", function (req, res) {
  res.json({
    message: "API platform-ecom en ligne"
  });
});

// ===============================
// GET ALL PRODUCTS
// ===============================

app.get("/api/products", function (req, res) {
  res.json(produits);
});

// ===============================
// GET PRODUCTS BY CATEGORY
// ===============================

app.get("/api/products/categorie/:nom", function (req, res) {
  const categorie = req.params.nom;

  const resultats = produits.filter(function (p) {
    return p.categorie.toLowerCase() === categorie.toLowerCase();
  });

  res.json(resultats);
});

// ===============================
// GET ONE PRODUCT
// ===============================

app.get("/api/products/:id", function (req, res) {
  const p = produits.find(function (x) {
    return x.id === Number(req.params.id);
  });

  if (!p) {
    return res.status(404).json({
      message: "Introuvable"
    });
  }

  res.json(p);
});

// ===============================
// CREATE PRODUCT
// ===============================

app.post("/api/products", function (req, res) {
  const nouveau = {
    id: Date.now(),
    ...req.body
  };

  produits.push(nouveau);

  res.status(201).json(nouveau);
});

// ===============================
// UPDATE PRODUCT
// ===============================

app.put("/api/products/:id", function (req, res) {
  const p = produits.find(function (x) {
    return x.id === Number(req.params.id);
  });

  if (!p) {
    return res.status(404).json({
      message: "Introuvable"
    });
  }

  p.nom = req.body.nom ?? p.nom;
  p.prix = req.body.prix ?? p.prix;
  p.description = req.body.description ?? p.description;
  p.categorie = req.body.categorie ?? p.categorie;

  res.json(p);
});

// ===============================
// DELETE PRODUCT
// ===============================

app.delete("/api/products/:id", function (req, res) {
  const id = Number(req.params.id);

  const exists = produits.some(function (x) {
    return x.id === id;
  });

  if (!exists) {
    return res.status(404).json({
      message: "Introuvable"
    });
  }

  produits = produits.filter(function (x) {
    return x.id !== id;
  });

  res.json({
    message: "Supprimé"
  });
});

// ===============================
// START SERVER
// ===============================

app.listen(5000, function () {
  console.log("Serveur sur http://localhost:5000");
});