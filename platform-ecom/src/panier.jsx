
import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [panier, setPanier] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem("panier");
      return sauvegarde ? JSON.parse(sauvegarde) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("panier", JSON.stringify(panier));
    } catch (err) {
      console.error("Impossible de sauvegarder le panier :", err);
    }
  }, [panier]);

  function ajouterAuPanier(produit) {
    setPanier((panierActuel) => {
      const existe = panierActuel.find(
        (p) => p._id === produit._id
      );

      if (existe) {
        return panierActuel.map((p) =>
          p._id === produit._id
            ? { ...p, quantite: p.quantite + 1 }
            : p
        );
      }

      return [...panierActuel, { ...produit, quantite: 1 }];
    });
  }

  function supprimerProduit(id) {
    setPanier((panierActuel) =>
      panierActuel.filter((p) => p._id !== id)
    );
  }

  function modifierQuantite(id, nouvelleQuantite) {
    if (nouvelleQuantite <= 0) {
      supprimerProduit(id);
      return;
    }

    setPanier((panierActuel) =>
      panierActuel.map((p) =>
        p._id === id
          ? { ...p, quantite: nouvelleQuantite }
          : p
      )
    );
  }

  function viderPanier() {
    setPanier([]);
  }

  const total = panier.reduce(
    (somme, produit) =>
      somme + Number(produit.prix || 0) * produit.quantite,
    0
  );

  const nombreProduits = panier.reduce(
    (somme, produit) => somme + produit.quantite,
    0
  );

  return (
    <PanierContext.Provider
      value={{
        panier,
        ajouterAuPanier,
        supprimerProduit,
        modifierQuantite,
        viderPanier,
        total,
        nombreProduits,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  return useContext(PanierContext);
}

export default function Panier() {
  const {
    panier,
    supprimerProduit,
    modifierQuantite,
    viderPanier,
    total,
  } = usePanier();

  const formatPrix = (prix) =>
    Number(prix || 0).toLocaleString("fr-DZ") + " DA";

  return (
    <main className="dz-page-container dz-cart-page">
      <div className="dz-cart-heading">
        <div>
          <span className="dz-eyebrow">VOTRE SÉLECTION</span>
          <h1>Mon panier</h1>
          <p>Retrouvez ici les produits que vous souhaitez commander.</p>
        </div>

        <Link to="/produits" className="dz-button dz-button-secondary">
          ← Continuer mes achats
        </Link>
      </div>

      {panier.length === 0 ? (
        <section className="dz-cart-empty">
          <div className="dz-cart-empty-icon">
            <span aria-hidden="true">🛍</span>
          </div>
          <h2>Votre panier est vide</h2>
          <p>Votre prochain coup de cœur vous attend dans notre boutique.</p>

          <Link to="/produits" className="dz-button dz-button-primary">
            Découvrir les produits
          </Link>
        </section>
      ) : (
        <div className="dz-cart-layout">
          <section className="dz-cart-items">
            {panier.map((produit) => (
              <article className="dz-cart-item" key={produit._id}>
                <Link
                  to={`/produit/${produit._id}`}
                  className="dz-cart-image-wrap"
                  aria-label={`Voir ${produit.nom}`}
                >
                  <img
                    src={produit.image}
                    alt={produit.nom}
                    className="dz-cart-image"
                  />
                </Link>

                <div className="dz-cart-product-info">
                  {produit.categorie && (
                    <span className="dz-cart-category">
                      {produit.categorie}
                    </span>
                  )}

                  <Link
                    to={`/produit/${produit._id}`}
                    className="dz-cart-product-name"
                  >
                    {produit.nom}
                  </Link>

                  <p className="dz-cart-unit-price">
                    {formatPrix(produit.prix)} / unité
                  </p>

                  <button
                    type="button"
                    className="dz-remove-link"
                    onClick={() => supprimerProduit(produit._id)}
                  >
                    Supprimer
                  </button>
                </div>

                <div className="dz-cart-item-end">
                  <div className="dz-quantity-control">
                    <button
                      type="button"
                      aria-label={`Diminuer la quantité de ${produit.nom}`}
                      onClick={() =>
                        modifierQuantite(
                          produit._id,
                          produit.quantite - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span aria-label={`Quantité : ${produit.quantite}`}>
                      {produit.quantite}
                    </span>

                    <button
                      type="button"
                      aria-label={`Augmenter la quantité de ${produit.nom}`}
                      onClick={() =>
                        modifierQuantite(
                          produit._id,
                          produit.quantite + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong className="dz-cart-line-total">
                    {formatPrix(Number(produit.prix || 0) * produit.quantite)}
                  </strong>
                </div>
              </article>
            ))}

            <button
              type="button"
              className="dz-clear-cart"
              onClick={viderPanier}
            >
              Vider le panier
            </button>
          </section>

          <aside className="dz-cart-summary">
            <h2>Résumé de la commande</h2>

            <div className="dz-summary-row">
              <span>Sous-total</span>
              <strong>{formatPrix(total)}</strong>
            </div>

            <div className="dz-summary-row">
              <span>Livraison</span>
              <span>À confirmer</span>
            </div>

            <div className="dz-summary-total">
              <span>Total des produits</span>
              <strong>{formatPrix(total)}</strong>
            </div>

            <p className="dz-summary-note">
              Les frais de livraison seront confirmés lors de la commande.
            </p>

            <Link
              className="dz-button dz-button-primary dz-checkout-button"
              to="/checkout"
            >
              Passer la commande <span aria-hidden="true">→</span>
            </Link>

            <div className="dz-secure-note">
              <span aria-hidden="true">✓</span>
              Vérifiez vos informations avant de confirmer.
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
