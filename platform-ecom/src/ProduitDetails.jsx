import { useParams, Link, useNavigate } from "react-router-dom";
import { usePanier } from "./panier";

import tshirt from "./assets/t-shirt.png";
import basket from "./assets/Shoes for Men.png";
import jeans from "./assets/jeans.png";
import casquette from "./assets/Casquette Homme Noir.png";
import lunettes from "./assets/lunettes.png";
import sweat from "./assets/sweat-shirt.png";
import veste from "./assets/veste.png";
import adidas from "./assets/adidas.png";
import laptop from "./assets/Laptop Rucksack.png";
import montre from "./assets/montre.png";

function ProduitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { ajouterAuPanier } = usePanier();

  const produits = [
    {
      id: 1,
      nom: "T-shirt",
      description: "T-shirt confortable en coton",
      prix: 899,
      img: tshirt,
    },
    {
      id: 2,
      nom: "Basket",
      description: "Baskets modernes et confortables",
      prix: 599,
      img: basket,
    },
    {
      id: 3,
      nom: "Jeans",
      description: "Jeans moderne et élégant",
      prix: 1999,
      img: jeans,
    },
    {
      id: 4,
      nom: "Casquette",
      description: "Casquette homme noire",
      prix: 799,
      img: casquette,
    },
    {
      id: 5,
      nom: "Lunettes",
      description: "Lunettes modernes",
      prix: 1299,
      img: lunettes,
    },
    {
      id: 6,
      nom: "Sweat-shirt",
      description: "Sweat-shirt confortable",
      prix: 2499,
      img: sweat,
    },
    {
      id: 7,
      nom: "Veste",
      description: "Veste élégante et moderne",
      prix: 3499,
      img: veste,
    },
    {
      id: 8,
      nom: "Adidas",
      description: "Chaussures Adidas",
      prix: 5999,
      img: adidas,
    },
    {
      id: 9,
      nom: "Laptop Rucksack",
      description: "Sac à dos pour ordinateur portable",
      prix: 2999,
      img: laptop,
    },
    {
      id: 10,
      nom: "Montre",
      description: "Montre élégante",
      prix: 3999,
      img: montre,
    },
  ];

  const produit = produits.find(
    (p) => p.id === Number(id)
  );

  if (!produit) {
    return (
      <div className="container text-center mt-5 pt-5">
        <h2>Produit introuvable</h2>

        <Link
          to="/produits"
          className="btn btn-primary mt-3"
        >
          Retour aux produits
        </Link>
      </div>
    );
  }

 const handleAjouter = () => {
  ajouterAuPanier(produit);
};

  return (
    <div className="container my-5 pt-5">
      <div className="row align-items-center">

        {/* Image */}
        <div className="col-md-6">
          <img
            src={produit.img}
            alt={produit.nom}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              height: "450px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Informations */}
        <div className="col-md-6 mt-4 mt-md-0">
          <h1>{produit.nom}</h1>

          <p className="text-muted mt-3">
            {produit.description}
          </p>

          <h2 className="mt-4">
            {produit.prix} DA
          </h2>

          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={handleAjouter}
          >
            🛒 Ajouter au panier
          </button>

          <br />

          <Link
            to="/produits"
            className="btn btn-outline-secondary mt-3"
          >
            ← Retour aux produits
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ProduitDetails;