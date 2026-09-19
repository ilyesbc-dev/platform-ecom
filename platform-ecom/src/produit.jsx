import Card from "./card";
import { produits } from "./produits";

function Produits() {
  return (
    <section className="container py-5 mt-5">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
          Notre collection
        </span>

        <h2 className="fw-bold display-5 mb-3">
          Nos produits
        </h2>

        <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
          Découvrez notre sélection de produits soigneusement choisis
          pour vous offrir qualité, style et simplicité.
        </p>
      </div>

      {/* Products */}
      <div className="row g-4">
        {produits.map((produit) => (
          <div
            className="col-12 col-sm-6 col-lg-4"
            key={produit.id}
          >
            <div
              className="h-100"
              style={{
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Card produit={produit} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom info */}
      <div className="text-center mt-5 pt-4 border-top">
        <p className="text-secondary mb-0">
          <strong>{produits.length}</strong> produits disponibles
        </p>
      </div>
    </section>
  );
}

export default Produits;