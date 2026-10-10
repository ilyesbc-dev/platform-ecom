
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { usePanier } from "./panier";
import { useAuth } from "./AuthContext";
import logo from "./assets/img3.png";

function NavBar() {
  const { panier } = usePanier();
  const { user, logout } = useAuth();
  const [menuOuvert, setMenuOuvert] = useState(false);

  const nombreProduits = panier.reduce(
    (total, produit) => total + produit.quantite,
    0
  );

  function fermerMenu() {
    setMenuOuvert(false);
  }

  const liens = [
    { to: "/", label: "Accueil", end: true },
    { to: "/produits", label: "Produits" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg fixed-top dz-navbar">
      <div className="container py-2">
        <Link
          className="dz-brand d-flex align-items-center gap-2"
          to="/"
          onClick={fermerMenu}
        >
          <span className="dz-brand-mark">
            <img src={logo} alt="" />
          </span>

          <span>
            DZ<span style={{ color: "#8da5ff" }}>ECORM</span>
          </span>
        </Link>

        <button
          type="button"
          className="dz-menu-toggle d-lg-none"
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOuvert}
        >
          <i className={`bi ${menuOuvert ? "bi-x-lg" : "bi-list"}`} />
        </button>

        <div
          className={`collapse navbar-collapse ${
            menuOuvert ? "show" : ""
          }`}
          id="dz-navbar-menu"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2 pt-3 pt-lg-0">
            {liens.map((lien) => (
              <li className="nav-item" key={lien.to}>
                <NavLink
                  to={lien.to}
                  end={lien.end}
                  onClick={fermerMenu}
                  className={({ isActive }) =>
                    `dz-nav-link d-block ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  {lien.label}
                </NavLink>
              </li>
            ))}

            {user && (
              <>
                <li className="nav-item">
                  <span className="dz-nav-link d-block">
                    <i className="bi bi-person-circle me-2" />
                    {user.nom || user.email}
                  </span>
                </li>

                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link
                      to="/admin"
                      className="dz-nav-link d-block"
                      onClick={fermerMenu}
                    >
                      <i className="bi bi-grid me-2" />
                      Administration
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <button
                    type="button"
                    className="dz-button"
                    style={{
                      minHeight: 40,
                      padding: "9px 15px",
                      color: "#fff",
                      background: "rgba(255,255,255,.08)",
                      borderColor: "rgba(255,255,255,.13)",
                    }}
                    onClick={() => {
                      fermerMenu();
                      logout();
                    }}
                  >
                    <i className="bi bi-box-arrow-right" />
                    Déconnexion
                  </button>
                </li>
              </>
            )}

            {!user && (
              <li className="nav-item">
                <Link
                  to="/signup"
                  onClick={fermerMenu}
                  className="dz-button dz-button-primary"
                  style={{ minHeight: 42, padding: "10px 19px" }}
                >
                  Créer un compte
                  <i className="bi bi-arrow-up-right" />
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                to="/panier"
                className="dz-cart-button"
                onClick={fermerMenu}
                aria-label={`Panier, ${nombreProduits} article(s)`}
              >
                <i className="bi bi-bag" />
                <span className="d-none d-xl-inline">Panier</span>
                {nombreProduits > 0 && (
                  <span className="dz-cart-count">
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
