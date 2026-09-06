import {
  createContext,
  useContext,
  useState,
} from "react";

const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [panier, setPanier] = useState([]);

  const ajouterAuPanier = (produit) => {
    setPanier((ancienPanier) => {
      const existe = ancienPanier.find(
        (p) => p.id === produit.id
      );

      if (existe) {
        return ancienPanier.map((p) =>
          p.id === produit.id
            ? {
                ...p,
                quantite: p.quantite + 1,
              }
            : p
        );
      }

      return [
        ...ancienPanier,
        {
          ...produit,
          quantite: 1,
        },
      ];
    });
  };

  const supprimerProduit = (id) => {
    setPanier((ancienPanier) =>
      ancienPanier.filter((p) => p.id !== id)
    );
  };

  const total = panier.reduce(
    (somme, produit) =>
      somme + produit.prix * produit.quantite,
    0
  );

  return (
    <PanierContext.Provider
      value={{
        panier,
        ajouterAuPanier,
        supprimerProduit,
        total,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  return useContext(PanierContext);
}

function Panier() {
  const {
    panier,
    supprimerProduit,
    total,
  } = usePanier();

  return (
    <div className="container mt-5 pt-5">

      <h1 className="mb-4">🛒 Mon Panier</h1>

      <div className="row">

        {/* ========================= */}
        {/* CARD 1 : PRODUITS */}
        {/* ========================= */}

        <div className="col-lg-8 mb-4">

          <div className="card shadow-sm">

            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">
                🛍️ Mes produits
              </h4>
            </div>

            <div className="card-body">

              {panier.length === 0 ? (
                <div className="text-center py-5">
                  <h4>Votre panier est vide</h4>

                  <p className="text-muted">
                    Ajoutez des produits pour les voir ici.
                  </p>
                </div>
              ) : (
                panier.map((produit) => (

                  <div
                    key={produit.id}
                    className="card mb-3"
                  >

                    <div className="card-body">

                      <div className="row align-items-center">

                        {/* Image */}
                        <div className="col-md-2">
                          <img
                            src={produit.img}
                            alt={produit.nom}
                            className="img-fluid rounded"
                            style={{
                              height: "100px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        {/* Informations */}
                        <div className="col-md-5">

                          <h5>
                            {produit.nom}
                          </h5>

                          <p className="text-muted mb-1">
                            {produit.description}
                          </p>

                          <strong>
                            {produit.prix} DA
                          </strong>

                        </div>

                        {/* Quantité */}
                        <div className="col-md-2">

                          <span>
                            Quantité :
                          </span>

                          <strong className="ms-2">
                            {produit.quantite}
                          </strong>

                        </div>

                        {/* Supprimer */}
                        <div className="col-md-3 text-end">

                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              supprimerProduit(produit.id)
                            }
                          >
                            🗑️ Supprimer
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))
              )}

            </div>
          </div>

        </div>


        {/* ========================= */}
        {/* CARD 2 : COMMANDE */}
        {/* ========================= */}

        <div className="col-lg-4">

          <div className="card shadow-sm">

            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                💰 Ma commande
              </h4>
            </div>

            <div className="card-body">

              {/* Sous-total */}
              <div className="d-flex justify-content-between mb-3">
                <span>
                  Sous-total
                </span>

                <strong>
                  {total} DA
                </strong>
              </div>


              {/* Livraison */}
              <div className="mb-3">

                <label className="form-label">
                  🚚 Livraison
                </label>

                <select className="form-select">

                  <option>
                    Livraison standard - 500 DA
                  </option>

                  <option>
                    Livraison rapide - 800 DA
                  </option>

                  <option>
                    Retrait en magasin - Gratuit
                  </option>

                </select>

              </div>


              <hr />


              {/* Total */}
              <div className="d-flex justify-content-between mb-4">

                <h5>
                  Total
                </h5>

                <h4 className="text-primary">
                  {total} DA
                </h4>

              </div>


              {/* Commander */}
              <button
                className="btn btn-success w-100 btn-lg"
                disabled={panier.length === 0}
              >
                🛍️ Commander
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Panier;