
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const [recherche, setRecherche] = useState("");
  const navigate = useNavigate();

  function chercher(e) {
    e.preventDefault();

    const terme = recherche.trim();

    if (terme) {
      navigate(`/produits?search=${encodeURIComponent(terme)}`);
    } else {
      navigate("/produits");
    }
  }

  return (
    <main className="dz-site">
      {/* HERO */}
      <section className="dz-hero dz-landing-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="dz-reveal">
                <span className="dz-eyebrow">
                  <span className="dz-eyebrow-dot" />
                  Votre shopping, autrement
                </span>
              </div>

              <h1 className="dz-hero-title dz-reveal dz-delay-1">
                Good finds.
                <br />
                Better <span>living.</span>
              </h1>

              <p className="dz-hero-copy dz-reveal dz-delay-2">
                Découvrez une nouvelle façon de faire vos achats.
                Explorez notre sélection, trouvez ce qu'il vous faut
                et commandez en quelques clics.
              </p>

              <div className="dz-hero-actions dz-reveal dz-delay-2">
                <Link to="/produits" className="dz-button dz-button-primary">
                  Explorer la boutique
                  <i className="bi bi-arrow-up-right" />
                </Link>

                <Link to="/contact" className="dz-button dz-button-outline">
                  Nous contacter
                  <i className="bi bi-arrow-right" />
                </Link>
              </div>

              <form
                onSubmit={chercher}
                className="dz-search dz-reveal dz-delay-3"
                role="search"
              >
                <i className="bi bi-search" aria-hidden="true" />

                <input
                  type="search"
                  aria-label="Rechercher un produit"
                  placeholder="Que recherchez-vous ?"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />

                <button type="submit" className="dz-button dz-button-primary">
                  Rechercher
                </button>
              </form>

              <div className="dz-hero-proof dz-reveal dz-delay-3">
                <span>
                  <i className="bi bi-check-circle" />
                  Simple à utiliser
                </span>
                <span>
                  <i className="bi bi-bag-check" />
                  Commande en ligne
                </span>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="dz-hero-visual dz-reveal dz-delay-2">
                <div className="dz-hero-orbit dz-hero-orbit-one" />
                <div className="dz-hero-orbit dz-hero-orbit-two" />

                <div className="dz-hero-image-frame">
                  <img
                    className="dz-hero-image"
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85"
                    alt="Intérieur lumineux d'une boutique moderne"
                    fetchPriority="high"
                  />

                  <div className="dz-image-overlay" />

                  <div className="dz-image-caption">
                    <span>BIENVENUE CHEZ DZECORM</span>
                    <h2>Find what feels right.</h2>
                    <p>Vos envies, votre style, votre shopping.</p>
                  </div>
                </div>

               

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="dz-trust-strip" aria-label="Les avantages de DZECORM">
        <div className="container">
          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="dz-trust-item">
                <i className="bi bi-search" />
                <span>
                  <strong>Trouvez facilement</strong>
                  <small>Recherche rapide</small>
                </span>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="dz-trust-item">
                <i className="bi bi-bag-check" />
                <span>
                  <strong>Commandez simplement</strong>
                  <small>Quelques étapes claires</small>
                </span>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="dz-trust-item">
                <i className="bi bi-phone" />
                <span>
                  <strong>Sur tous vos écrans</strong>
                  <small>Mobile et ordinateur</small>
                </span>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="dz-trust-item">
                <i className="bi bi-chat-dots" />
                <span>
                  <strong>Besoin d'aide ?</strong>
                  <small>Nous contacter facilement</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="dz-section dz-landing-benefits">
        <div className="container">
          <div className="dz-benefits-heading">
            <span className="dz-section-kicker">L'expérience DZECORM</span>

            <h2 className="dz-section-title">
              Less searching.
              <br />
              <span>More finding.</span>
            </h2>

            <p className="dz-section-copy">
              Tout commence par une expérience simple : découvrir,
              comparer et trouver le produit qui vous convient.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <article className="dz-feature dz-feature-modern">
                <div className="dz-feature-number">01</div>
                <div className="dz-feature-icon">
                  <i className="bi bi-grid" />
                </div>
                <h3>Explorez librement</h3>
                <p>
                  Parcourez les produits disponibles et consultez leurs
                  informations pour faire votre choix.
                </p>
                <Link to="/produits" className="dz-feature-link">
                  Découvrir les produits <i className="bi bi-arrow-up-right" />
                </Link>
              </article>
            </div>

            <div className="col-md-4">
              <article className="dz-feature dz-feature-modern dz-feature-highlight">
                <div className="dz-feature-number">02</div>
                <div className="dz-feature-icon">
                  <i className="bi bi-bag-heart" />
                </div>
                <h3>Choisissez à votre rythme</h3>
                <p>
                  Retrouvez les détails des articles et ajoutez au panier
                  ceux que vous souhaitez commander.
                </p>
                <Link to="/produits" className="dz-feature-link">
                  Voir la boutique <i className="bi bi-arrow-up-right" />
                </Link>
              </article>
            </div>

            <div className="col-md-4">
              <article className="dz-feature dz-feature-modern">
                <div className="dz-feature-number">03</div>
                <div className="dz-feature-icon">
                  <i className="bi bi-chat-square-text" />
                </div>
                <h3>Nous sommes à l'écoute</h3>
                <p>
                  Une question sur un produit ou une commande ?
                  Retrouvez notre page contact pour nous écrire.
                </p>
                <Link to="/contact" className="dz-feature-link">
                  Parlons ensemble <i className="bi bi-arrow-up-right" />
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="dz-landing-cta-section">
        <div className="container">
          <div className="dz-landing-cta">
            <div className="dz-cta-decoration dz-cta-decoration-one" />
            <div className="dz-cta-decoration dz-cta-decoration-two" />

            <div className="dz-cta-content">
              <span className="dz-cta-eyebrow">
                <i className="bi bi-stars" /> À vous de jouer
              </span>

              <h2>Your next great find starts here.</h2>

              <p>
                Prêt à découvrir la boutique ? Parcourez les produits
                disponibles et trouvez votre prochain coup de cœur.
              </p>

              <Link to="/produits" className="dz-button dz-cta-button">
                Commencer à explorer
                <i className="bi bi-arrow-up-right" />
              </Link>
            </div>

            <div className="dz-cta-icon" aria-hidden="true">
              <i className="bi bi-bag-heart" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
