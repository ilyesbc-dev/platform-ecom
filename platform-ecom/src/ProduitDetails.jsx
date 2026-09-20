import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "./api";
import { usePanier } from "./panier";

function ProduitDetails() {
  const { id } = useParams();

  const [produit, setProduit] = useState(null);
  const [chargement, setChargement] = useState(true);

  const { ajouterAuPanier } = usePanier();

  useEffect(() => {
    apiFetch("/api/products/" + id)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setProduit(data);
        setChargement(false);
      })
      .catch(() => {
        setChargement(false);
      });
  }, [id]);

  if (chargement) {
    return (
      <p className="container text-center mt-5 pt-5">
        Chargement...
      </p>
    );
  }

  if (!produit) {
    return (
      <div className="container text-center mt-5 pt-5">
        <h2>Produit introuvable</h2>

        <Link to="/produits" className="btn btn-primary mt-3">
          Retour aux produits
        </Link>
      </div>
    );
  }

  function ajouter() {
    ajouterAuPanier(produit);
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row align-items-center">

        <div className="col-md-6 text-center">
          <img
            src={produit.image}
            alt={produit.nom}
            className="img-fluid"
            style={{
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="col-md-6">
          <h1>{produit.nom}</h1>

          <p className="text-secondary">
            {produit.description}
          </p>

          <h3 className="fw-bold">
            {produit.prix} DA
          </h3>

          <p>
            Stock : {produit.stock}
          </p>

          <Link
            to="/produits"
            className="btn btn-secondary me-2"
          >
            Retour
          </Link>

          <button
            className="btn btn-primary"
            onClick={ajouter}
          >
            Ajouter au panier
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProduitDetails;