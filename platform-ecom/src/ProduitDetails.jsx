
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "./api";
import { usePanier } from "./panier";

function ProduitDetails() {
  const { id } = useParams();

  const [produit, setProduit] = useState(null);
  const [chargement, setChargement] = useState(true);

  const { ajouterAuPanier } = usePanier();

  useEffect(() => {
    let actif = true;

    setChargement(true);

    apiFetch("/api/products/" + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Produit introuvable");
        }

        return res.json();
      })
      .then((data) => {
        if (actif) {
          setProduit(data);
          setChargement(false);
        }
      })
      .catch((err) => {
        console.error(err);

        if (actif) {
          setProduit(null);
          setChargement(false);
        }
      });

    return () => {
      actif = false;
    };
  }, [id]);

  if (chargement) {
    return (
      <div className="dz-page-container dz-loading">
        <div className="dz-spinner" aria-label="Chargement" />
        <p>Chargement du produit...</p>
      </div>
    );
  }

  if (!produit) {
    return (
      <div className="dz-page-container dz-empty-state">
        <span className="dz-empty-icon">?</span>
        <h2>Produit introuvable</h2>
        <p>Ce produit n'existe pas ou n'est plus disponible.</p>

        <Link to="/produits" className="dz-button dz-button-primary">
          Retour aux produits
        </Link>
      </div>
    );
  }

  const enStock = Number(produit.stock) > 0;

  function ajouter() {
    if (enStock) {
      ajouterAuPanier(produit);
    }
  }

  return (
    <main className="dz-page-container dz-product-details-page">
      <nav className="dz-breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <span>/</span>
        <Link to="/produits">Produits</Link>
        <span>/</span>
        <span>{produit.nom}</span>
      </nav>

      <section className="dz-product-details">
        <div className="dz-details-image-panel">
          <div className="dz-details-image-wrap">
            <img
              src={produit.image}
              alt={produit.nom}
              className="dz-details-image"
            />
          </div>
        </div>

        <div className="dz-details-info">
          {produit.categorie && (
            <span className="dz-details-category">
              {produit.categorie}
            </span>
          )}

          <h1>{produit.nom}</h1>

          <p className="dz-details-description">
            {produit.description || "Aucune description disponible pour ce produit."}
          </p>

          <div className="dz-details-price">
            {Number(produit.prix || 0).toLocaleString("fr-DZ")} DA
          </div>

          <div className={`dz-stock-status ${enStock ? "in-stock" : "out-stock"}`}>
            <span className="dz-stock-dot" />
            {enStock
              ? `${produit.stock} disponible(s)`
              : "Rupture de stock"}
          </div>

          <div className="dz-details-actions">
            <button
              type="button"
              className="dz-button dz-button-primary dz-add-cart-button"
              onClick={ajouter}
              disabled={!enStock}
            >
              {enStock ? "Ajouter au panier" : "Indisponible"}
              {enStock && <span aria-hidden="true"> →</span>}
            </button>

            <Link to="/produits" className="dz-button dz-button-secondary">
              Continuer mes achats
            </Link>
          </div>

          <div className="dz-details-note">
            <span aria-hidden="true">✓</span>
            <p>Une expérience d'achat simple et pratique.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProduitDetails;
