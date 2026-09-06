import { Link } from "react-router-dom";

function Card({ produit }) {
  return (
    <div className="card h-100 shadow-sm">

      <img
        src={produit.img}
        alt={produit.nom}
        className="card-img-top"
        style={{
          height: "250px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">

        <h5 className="card-title">
          {produit.nom}
        </h5>

        <p className="text-muted">
          {produit.description}
        </p>

        <h5 className="mt-auto">
          {produit.prix} DA
        </h5>

        <Link
          to={`/produit/${produit.id}`}
          className="btn btn-primary mt-3"
        >
          Voir les détails
        </Link>

      </div>
    </div>
  );
}

export default Card;