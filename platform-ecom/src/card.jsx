
import { Link } from "react-router-dom";

function Card({ produit }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={produit.image}
        className="card-img-top"
        alt={produit.nom}
        style={{
          height: "220px",
          objectFit: "contain",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{produit.nom}</h5>

        <p className="card-text text-secondary">
          {produit.description}
        </p>

        <p className="fw-bold">
          {produit.prix} DA
        </p>

        <Link
          to={`/produit/${produit._id}`}
          className="btn btn-primary mt-auto"
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
}

export default Card;

