
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./card";
import { apiFetch, lireJson } from "./api";

function Produits() {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const rechercheURL = searchParams.get("search") || "";
  const pageURL = Number(searchParams.get("page")) || 1;

  const [recherche, setRecherche] = useState(rechercheURL);
  const [page, setPage] = useState(pageURL);

  const produitsParPage = 4;

  // Récupérer les produits depuis le backend
  useEffect(() => {
    apiFetch("/api/products")
      .then(lireJson)
      .then((data) => {
        setProduits(data);
      })
      .catch((err) => {
        console.error("Erreur:", err);
      })
      .finally(() => {
        setChargement(false);
      });
  }, []);

  // Synchroniser avec l'URL
  useEffect(() => {
    setRecherche(rechercheURL);
    setPage(pageURL);
  }, [rechercheURL, pageURL]);

  // Recherche
  function chercher(e) {
    e.preventDefault();

    const terme = recherche.trim();

    if (terme) {
      setSearchParams({
        search: terme,
        page: "1",
      });
    } else {
      setSearchParams({
        page: "1",
      });
    }
  }

  // Filtrer les produits
  const produitsFiltres = produits.filter((produit) => {
    const terme = recherche.toLowerCase().trim();

    // Pas de filtre avant 3 caractères
    if (terme.length < 3) {
      return true;
    }

    return (
      produit.nom?.toLowerCase().includes(terme) ||
      produit.description?.toLowerCase().includes(terme) ||
      produit.categorie?.toLowerCase().includes(terme)
    );
  });

  // Nombre total de pages
  const totalPages = Math.ceil(
    produitsFiltres.length / produitsParPage
  );

  // Éviter une page invalide
  const pageActuelle =
    totalPages > 0 ? Math.min(page, totalPages) : 1;

  // Produits de la page actuelle
  const indexDebut = (pageActuelle - 1) * produitsParPage;
  const indexFin = indexDebut + produitsParPage;

  const produitsAffiches = produitsFiltres.slice(
    indexDebut,
    indexFin
  );

  // Changer de page
  function allerPage(numeroPage) {
    setSearchParams({
      ...(recherche ? { search: recherche } : {}),
      page: numeroPage.toString(),
    });
  }

  return (
    <div className="container mt-5 pt-5">

      <h1 className="text-center mb-4">
        Nos Produits
      </h1>

      {/* SEARCH BAR */}
      <form
        onSubmit={chercher}
        className="mx-auto mb-5"
        style={{ maxWidth: "600px" }}
      >
        <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden">

          <span className="input-group-text bg-white border-0 ps-4">
            <i className="bi bi-search text-primary"></i>
          </span>

          <input
            type="text"
            className="form-control bg-white border-0"
            placeholder="Rechercher un produit..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary px-4"
          >
            Rechercher
          </button>

        </div>
      </form>

      {/* LOADING */}
      {chargement && (
        <p className="text-center text-secondary">
          Chargement...
        </p>
      )}

      {/* NO RESULTS */}
      {!chargement && produitsFiltres.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-search fs-1 text-secondary"></i>

          <h4 className="mt-3">
            Aucun produit trouvé
          </h4>

          <p className="text-secondary">
            Aucun résultat pour "{recherche}"
          </p>
        </div>
      )}

      {/* PRODUCTS */}
      {!chargement && produitsFiltres.length > 0 && (
        <div className="row">

          {produitsAffiches.map((produit) => (
            <div
              className="col-md-6 col-lg-6 mb-4"
              key={produit._id}
            >
              <Card produit={produit} />
            </div>
          ))}

        </div>
      )}

      {/* PAGINATION */}
      {!chargement && totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4 mb-5">

          {/* PREVIOUS */}
          <button
            className="btn btn-outline-primary rounded-pill px-4"
            disabled={pageActuelle === 1}
            onClick={() => allerPage(pageActuelle - 1)}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Previous
          </button>

          {/* PAGE NUMBERS */}
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((numeroPage) => (
            <button
              key={numeroPage}
              className={
                pageActuelle === numeroPage
                  ? "btn btn-primary rounded-circle"
                  : "btn btn-outline-primary rounded-circle"
              }
              style={{
                width: "42px",
                height: "42px",
              }}
              onClick={() => allerPage(numeroPage)}
            >
              {numeroPage}
            </button>
          ))}

          {/* NEXT */}
          <button
            className="btn btn-outline-primary rounded-pill px-4"
            disabled={pageActuelle === totalPages}
            onClick={() => allerPage(pageActuelle + 1)}
          >
            Next
            <i className="bi bi-arrow-right ms-2"></i>
          </button>

        </div>
      )}

    </div>
  );
}

export default Produits;
