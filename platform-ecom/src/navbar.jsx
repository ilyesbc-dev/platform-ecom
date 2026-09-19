
import { Link } from "react-router-dom";
import { usePanier } from "./panier";

function NavBar() {
  const { panier } = usePanier();

 
  const nombreProduits = panier.reduce(
    (total, produit) => total + produit.quantite,
    0
  );

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="container py-2">
        {/* Logo */}
        <Link
          className="navbar-brand text-white d-flex align-items-center gap-2 fw-bold"
          to="/"
          style={{ fontSize: "1.3rem" }}
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "42px",
              height: "42px",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <img
              src="/src/assets/img3.png"
              alt="DZShop Logo"
              width="32"
              height="32"
              style={{ objectFit: "contain" }}
            />
          </div>

          <span>
            DZ<span className="text-primary">ECORM</span>
          </span>
        </Link>

        {/* Mobile Button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            {/* Home */}
            <li className="nav-item">
              <Link
                className="nav-link text-white px-3"
                to="/"
                style={{
                  transition: "0.3s",
                }}
              >
                Home
              </Link>
            </li>

            {/* Products */}
            <li className="nav-item">
              <Link
                className="nav-link text-white px-3"
                to="/produits"
                style={{
                  transition: "0.3s",
                }}
              >
                Products
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link
                className="nav-link text-white px-3"
                to="/contact"
                style={{
                  transition: "0.3s",
                }}
              >
                Contact
              </Link>
            </li>

            {/* Sign Up */}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <Link
                to="/signup"
                className="btn btn-primary px-4 rounded-pill fw-semibold"
                style={{
                  boxShadow: "0 4px 12px rgba(13, 110, 253, 0.3)",
                }}
              >
                Sign Up
              </Link>
            </li>

            {/* Panier */}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <Link
                to="/panier"
                className="btn btn-light rounded-pill px-3 d-flex align-items-center gap-2 fw-semibold"
                style={{
                  transition: "0.3s",
                }}
              >
                <i className="bi bi-cart3"></i>

                <span>Panier</span>

                {nombreProduits > 0 && (
                  <span className="badge bg-danger rounded-pill">
                    {nombreProduits}
                  </span>
                )}
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

