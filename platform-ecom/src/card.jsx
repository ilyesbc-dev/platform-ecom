
import { Link } from "react-router-dom";

function Card({ produit }) {
  if (!produit) return null;

  return (
    <article className="dz-product-card h-100">
      <Link
        to={`/produit/${produit._id}`}
        className="dz-product-image-link"
        aria-label={`Voir ${produit.nom}`}
      >
        <div className="dz-product-image-wrap">
          {produit.categorie && (
            <span className="dz-product-category">
              {produit.categorie}
            </span>
          )}

          <img
            src={produit.image}
            alt={produit.nom || "Produit"}
            className="dz-product-image"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="dz-product-content">
        <h3 className="dz-product-name">
          {produit.nom}
        </h3>

        <p className="dz-product-description">
          {produit.description || "Découvrez ce produit dans notre boutique."}
        </p>

        <div className="dz-product-bottom">
          <p className="dz-product-price">
            {Number(produit.prix || 0).toLocaleString("fr-DZ")} DA
          </p>

          <Link
            to={`/produit/${produit._id}`}
            className="dz-product-button"
          >
            Voir le produit
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Card;
