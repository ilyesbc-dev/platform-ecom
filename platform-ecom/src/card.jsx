import { Link } from "react-router-dom";

function Card({ produit }) {
  return (
    <div className="card h-100 shadow-sm">

      <img
        src={produit.img}
        className="card-img-top"
        alt={produit.nom}
        style={{
          height: "250px",
          objectFit: "cover"
        }}
      />

      <div className="card-body d-flex flex-column">

        <h5 className="card-title">
          {produit.nom}
        </h5>

        <p className="card-text text-muted">
          {produit.description}
        </p>

        <p className="fw-bold">
          {produit.prix} DA
        </p>

        <p className="small text-secondary">
          {produit.categorie}
        </p>

        <Link
          to={`/produit/${produit.id}`}
          className="btn btn-primary mt-auto"
        >
          Voir le produit
        </Link>

      </div>

    </div>
  );
}

export default Card;