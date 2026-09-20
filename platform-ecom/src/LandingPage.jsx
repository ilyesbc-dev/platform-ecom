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
    <section
      className="bg-light"
      style={{
        marginTop: "70px",
        minHeight: "calc(100vh - 70px)",
        overflow: "hidden",
      }}
    >
      <div className="container py-5">
        <div
          className="row align-items-center"
          style={{ minHeight: "80vh" }}
        >
          {/* TEXT */}
          <div className="col-lg-6 text-center text-lg-start">

            {/* Badge */}
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-4">
              🇩🇿 Welcome to DZECORM
            </span>

            {/* Title */}
            <h1 className="display-3 fw-bold lh-sm mb-4">
              Discover
              <span className="text-primary"> Products </span>
              You'll Love.
            </h1>

            {/* Description */}
            <p
              className="lead text-secondary mb-4"
              style={{ maxWidth: "550px" }}
            >
              Quality products, great prices, and a simple shopping
              experience. Everything you need, all in one place.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
              <Link
                to="/produits"
                className="btn btn-primary btn-lg rounded-pill px-4 fw-semibold shadow-sm"
              >
                Explore Products
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>

              <Link
                to="/produits"
                className="btn btn-outline-dark btn-lg rounded-pill px-4"
              >
                <i className="bi bi-bag me-2"></i>
                Shop Now
              </Link>
            </div>

            {/* Features */}
            <div className="row mt-5 g-3">
              <div className="col-4">
                <i className="bi bi-truck text-primary fs-4"></i>

                <strong className="d-block small mt-1">
                  Fast Delivery
                </strong>

                <small className="text-secondary">
                  Quick shipping
                </small>
              </div>

              <div className="col-4">
                <i className="bi bi-shield-check text-primary fs-4"></i>

                <strong className="d-block small mt-1">
                  Secure
                </strong>

                <small className="text-secondary">
                  Safe shopping
                </small>
              </div>

              <div className="col-4">
                <i className="bi bi-star-fill text-primary fs-4"></i>

                <strong className="d-block small mt-1">
                  Quality
                </strong>

                <small className="text-secondary">
                  Trusted products
                </small>
              </div>
            </div>
          </div>

          {/* IMAGE + SEARCH */}
          <div className="col-lg-6 mt-5 mt-lg-0">

            {/* SEARCH BAR ABOVE IMAGE */}
            <form
              onSubmit={chercher}
              className="mb-4 mx-auto"
              style={{ maxWidth: "550px" }}
            >
              <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden">
                <span className="input-group-text bg-white border-0 ps-4">
                  <i className="bi bi-search text-primary"></i>
                </span>

                <input
                  type="text"
                  className="form-control bg-white border-0"
                  placeholder="Search for a product..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />

                <button
                  type="submit"
                  className="btn btn-primary px-4"
                >
                  Search
                </button>
              </div>
            </form>

            {/* YOUR ORIGINAL IMAGE */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  maxHeight: "500px",
                  width: "100%",
                  objectFit: "cover",
                  animation: "floatingImage 4s ease-in-out infinite",
                }}
                alt="DZShop"
              />
            </div>

          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes floatingImage {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
    </section>
  );
}

export default LandingPage;