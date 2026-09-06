import { Link } from "react-router-dom";
import { usePanier } from "./panier";

function NavBar() {
  const { panier } = usePanier();

  // Total number of products
  const nombreProduits = panier.reduce(
    (total, produit) => total + produit.quantite,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container">

        {/* Logo + DZShop */}
        <Link
          className="navbar-brand text-white d-flex align-items-center gap-2"
          to="/"
        >
          <img
            src="/src/assets/img3.png"
            alt="DZShop Logo"
            width="35"
            height="35"
            style={{ objectFit: "contain" }}
          />
          DZShop
        </Link>

        {/* Mobile Button */}
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {/* Products */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/produits">
                Products
              </Link>
            </li>

            {/* Blog */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/blog">
                Blog
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact">
                Contact
              </Link>
            </li>

            {/* Panier */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link
                to="/panier"
                className="btn btn-light d-flex align-items-center gap-2"
              >
                <i className="bi bi-cart3"></i>

                🛒 Panier

                {/* Number */}
                {nombreProduits > 0 && (
                  <span className="badge bg-danger">
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