import { useParams, Link } from "react-router-dom";
import { usePanier } from "./panier";
import { produits } from "./produits";

function ProduitDetails() {
  const { id } = useParams();

  const { ajouterAuPanier } = usePanier();

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

        {/* IMAGE */}
        <div className="col-md-6">

          <img
            src={produit.img}
            alt={produit.nom}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              height: "450px",
              objectFit: "cover"
            }}
          />

        </div>

        {/* INFORMATIONS */}
        <div className="col-md-6 mt-4 mt-md-0">

          <h1>{produit.nom}</h1>

          <p className="text-muted mt-3">
            {produit.description}
          </p>

          <p className="mt-3">
            <strong>Catégorie :</strong>{" "}
            {produit.categorie}
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