
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./card";
import { apiFetch, lireJson } from "./api";

function Produits() {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const rechercheURL = searchParams.get("search") || "";
  const pageURL = Math.max(
    1,
    Number.parseInt(searchParams.get("page"), 10) || 1
  );

  const [recherche, setRecherche] = useState(rechercheURL);
  const [page, setPage] = useState(pageURL);

  const produitsParPage = 4;

  // Récupérer les produits depuis le backend
  useEffect(() => {
    let actif = true;

    apiFetch("/api/products")
      .then(lireJson)
      .then((data) => {
        if (actif) {
          setProduits(Array.isArray(data) ? data : []);
          setErreur("");
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des produits :", err);

        if (actif) {
          setProduits([]);
          setErreur("Impossible de charger les produits. Réessayez plus tard.");
        }
      })
      .finally(() => {
        if (actif) {
          setChargement(false);
        }
      });

    return () => {
      actif = false;
    };
  }, []);

  // Synchroniser la recherche et la page avec l'URL
  useEffect(() => {
    setRecherche(rechercheURL);
    setPage(pageURL);
  }, [rechercheURL, pageURL]);

  // Recherche
  function chercher(e) {
    e.preventDefault();

    const terme = recherche.trim();
    const nouveauxParams = new URLSearchParams();

    if (terme) {
      nouveauxParams.set("search", terme);
    }

    nouveauxParams.set("page", "1");
    setSearchParams(nouveauxParams);
  }

  // Filtrer les produits
  const terme = recherche.trim().toLocaleLowerCase();

  const produitsFiltres = produits.filter((produit) => {
    // Afficher tous les produits si le terme est trop court
    if (terme.length < 3) {
      return true;
    }

    return (
      produit.nom?.toLocaleLowerCase().includes(terme) ||
      produit.description?.toLocaleLowerCase().includes(terme) ||
      produit.categorie?.toLocaleLowerCase().includes(terme)
    );
  });

  // Pagination
  const totalPages = Math.ceil(
    produitsFiltres.length / produitsParPage
  );

  const pageActuelle =
    totalPages > 0 ? Math.min(page, totalPages) : 1;

  const indexDebut = (pageActuelle - 1) * produitsParPage;
  const produitsAffiches = produitsFiltres.slice(
    indexDebut,
    indexDebut + produitsParPage
  );

  // Changer de page en conservant la recherche dans l'URL
  function allerPage(numeroPage) {
    const nouvellePage = Math.max(
      1,
      Math.min(numeroPage, totalPages)
    );

    const nouveauxParams = new URLSearchParams();

    if (recherche.trim()) {
      nouveauxParams.set("search", recherche.trim());
    }

    nouveauxParams.set("page", nouvellePage.toString());
    setSearchParams(nouveauxParams);
  }

  function effacerRecherche() {
    setRecherche("");
    setSearchParams({ page: "1" });
  }

  return (
    <main className="dz-page-container dz-products-page">
      <section className="dz-products-heading">
        <div>
          <span className="dz-eyebrow">LA BOUTIQUE DZECORM</span>

          <h1>Nos produits<span>.</span></h1>

          <p>
            Trouvez les produits qui vous correspondent,
            en quelques clics.
          </p>
        </div>

        {!chargement && !erreur && (
          <div className="dz-products-count">
            <strong>{produitsFiltres.length}</strong>
            <span>
              {produitsFiltres.length > 1
                ? "produits disponibles"
                : "produit disponible"}
            </span>
          </div>
        )}
      </section>

      <form
        onSubmit={chercher}
        className="dz-products-search"
        role="search"
      >
        <span className="dz-search-icon" aria-hidden="true">
          <i className="bi bi-search" />
        </span>

        <input
          type="search"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un produit, une catégorie..."
          aria-label="Rechercher un produit"
        />

        {recherche && (
          <button
            type="button"
            className="dz-search-clear"
            onClick={effacerRecherche}
            aria-label="Effacer la recherche"
          >
            <i className="bi bi-x-lg" />
          </button>
        )}

        <button type="submit" className="dz-search-submit">
          Rechercher
        </button>
      </form>

      {terme.length > 0 && terme.length < 3 && (
        <p className="dz-search-hint">
          Saisissez au moins 3 caractères pour filtrer les résultats.
        </p>
      )}

      {chargement && (
        <div className="dz-products-loading">
          <div className="dz-spinner" aria-label="Chargement" />
          <p>Chargement des produits...</p>
        </div>
      )}

      {!chargement && erreur && (
        <div className="dz-products-message dz-products-error">
          <i className="bi bi-exclamation-circle" aria-hidden="true" />
          <h2>Oups, une erreur est survenue</h2>
          <p>{erreur}</p>

          <button
            type="button"
            className="dz-button dz-button-primary"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      )}

      {!chargement && !erreur && produitsFiltres.length === 0 && (
        <div className="dz-products-message">
          <div className="dz-products-empty-icon">
            <i className="bi bi-search" aria-hidden="true" />
          </div>

          <h2>Aucun produit trouvé</h2>

          <p>
            {terme.length >= 3
              ? `Aucun résultat pour « ${recherche.trim()} ».`
              : "Aucun produit n'est disponible pour le moment."}
          </p>

          {recherche && (
            <button
              type="button"
              className="dz-button dz-button-secondary"
              onClick={effacerRecherche}
            >
              Voir tous les produits
            </button>
          )}
        </div>
      )}

      {!chargement && !erreur && produitsFiltres.length > 0 && (
        <>
          <div className="dz-products-results">
            <p>
              {terme.length >= 3
                ? `Résultats pour « ${recherche.trim()} »`
                : "Découvrez notre sélection"}
            </p>

            {totalPages > 1 && (
              <span>
                Page {pageActuelle} sur {totalPages}
              </span>
            )}
          </div>

          <div className="row g-4 dz-products-grid">
            {produitsAffiches.map((produit) => (
              <div
                className="col-12 col-sm-6 col-xl-3"
                key={produit._id}
              >
                <Card produit={produit} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="dz-pagination"
              aria-label="Pagination des produits"
            >
              <button
                type="button"
                className="dz-page-arrow"
                disabled={pageActuelle === 1}
                onClick={() => allerPage(pageActuelle - 1)}
                aria-label="Page précédente"
              >
                <i className="bi bi-arrow-left" />
                <span>Précédent</span>
              </button>

              <div className="dz-page-numbers">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((numeroPage) => (
                  <button
                    type="button"
                    key={numeroPage}
                    className={
                      pageActuelle === numeroPage
                        ? "dz-page-number active"
                        : "dz-page-number"
                    }
                    aria-current={
                      pageActuelle === numeroPage ? "page" : undefined
                    }
                    onClick={() => allerPage(numeroPage)}
                  >
                    {numeroPage}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="dz-page-arrow"
                disabled={pageActuelle === totalPages}
                onClick={() => allerPage(pageActuelle + 1)}
                aria-label="Page suivante"
              >
                <span>Suivant</span>
                <i className="bi bi-arrow-right" />
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}

export default Produits;
