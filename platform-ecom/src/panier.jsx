
import { createContext, useContext, useEffect, useState } from "react";

const PanierContext = createContext();

export function PanierProvider({ children }) {
  // Au démarrage, on relit le panier sauvegardé
  const [panier, setPanier] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem("panier");
      return sauvegarde ? JSON.parse(sauvegarde) : [];
    } catch {
      return [];
    }
  });

  // À chaque changement du panier, on le sauvegarde
  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(panier));
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

      return [
        ...panierActuel,
        {
          ...produit,
          quantite: 1,
        },
      ];
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
      somme + produit.prix * produit.quantite,
    0
  );

  const nombreProduits = panier.reduce(
    (somme, produit) =>
      somme + produit.quantite,
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

  return (
    <div className="container mt-5 pt-5">
      <h1 className="mb-4">Mon panier</h1>

      {panier.length === 0 ? (
        <p className="text-secondary">
          Votre panier est vide.
        </p>
      ) : (
        <>
          {panier.map((produit) => (
            <div
              key={produit._id}
              className="card mb-3 shadow-sm"
            >
              <div className="card-body">
                <div className="row align-items-center">

                  <div className="col-md-2">
                    <img
                      src={produit.image}
                      alt={produit.nom}
                      className="img-fluid"
                      style={{
                        height: "100px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="col-md-3">
                    <h5>{produit.nom}</h5>
                    <p className="text-secondary mb-0">
                      {produit.prix} DA
                    </p>
                  </div>

                  <div className="col-md-3">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          modifierQuantite(
                            produit._id,
                            produit.quantite - 1
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {produit.quantite}
                      </span>

                      <button
                        className="btn btn-outline-secondary"
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
                  </div>

                  <div className="col-md-2">
                    <strong>
                      {produit.prix * produit.quantite} DA
                    </strong>
                  </div>

                  <div className="col-md-2">
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        supprimerProduit(produit._id)
                      }
                    >
                      Supprimer
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-danger"
              onClick={viderPanier}
            >
              Vider le panier
            </button>

            <h3>
              Total : {total} DA
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

