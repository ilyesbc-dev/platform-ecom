
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { usePanier } from "./panier";
import { useAuth } from "./AuthContext";
import logo from "./assets/img3.png";

function NavBar() {
  const { panier } = usePanier();
  const { user, logout } = useAuth();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const navigate = useNavigate();

  function fermerMenu() {
    setMenuOuvert(false);
  }

  function gererDeconnexion() {
    fermerMenu();
    logout();
    navigate("/", { replace: true });
  }

  function lienClass({ isActive }) {
    return `dz-nav-link${isActive ? " active" : ""}`;
  }

  const styles = `
    .dz-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 12px 0;
      background: rgba(248, 250, 252, 0.94);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    .dz-navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      min-height: 68px;
      padding: 12px 22px;
      background: #fff;
      border: 1px solid #e5eaf2;
      border-radius: 18px;
      box-shadow: 0 5px 22px rgba(15, 23, 42, 0.06);
    }

    .dz-brand {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      flex-shrink: 0;
      color: #0f172a;
      text-decoration: none;
      font-size: 23px;
      font-weight: 800;
      letter-spacing: -0.8px;
    }

    .dz-brand img {
      width: 42px;
      height: 42px;
      object-fit: contain;
    }

    .dz-brand-accent {
      color: #2563eb;
    }

    .dz-brand:hover {
      color: #0f172a;
    }

    .dz-nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      gap: 20px;
    }

    .dz-nav-links,
    .dz-nav-actions,
    .dz-auth-actions,
    .dz-user-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dz-nav-link {
      display: inline-flex;
      align-items: center;
      padding: 11px 14px;
      border-radius: 11px;
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: color 0.2s, background 0.2s;
    }

    .dz-nav-link:hover,
    .dz-nav-link.active {
      color: #2563eb;
      background: #eff6ff;
    }

    .dz-cart-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 12px;
      border-radius: 11px;
      color: #334155;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: background 0.2s, color 0.2s;
    }

    .dz-cart-link:hover {
      color: #2563eb;
      background: #f1f5ff;
    }

    .dz-cart-link > i {
      font-size: 19px;
    }

    .dz-cart-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 21px;
      height: 21px;
      padding: 0 5px;
      border-radius: 20px;
      color: white;
      background: #2563eb;
      font-size: 11px;
      font-weight: 700;
    }

    .dz-login-button,
    .dz-signup-button,
    .dz-admin-button,
    .dz-logout-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      min-height: 42px;
      padding: 10px 14px;
      border: 1px solid transparent;
      border-radius: 11px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, transform 0.2s;
    }

    .dz-login-button {
      color: #334155;
      background: #fff;
      border-color: #e2e8f0;
    }

    .dz-login-button:hover {
      color: #2563eb;
      background: #f8fafc;
    }

    .dz-signup-button {
      color: #fff;
      background: #2563eb;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.16);
    }

    .dz-signup-button:hover {
      color: #fff;
      background: #1d4ed8;
      transform: translateY(-1px);
    }

    .dz-admin-button {
      color: #1d4ed8;
      background: #eff6ff;
    }

    .dz-admin-button:hover {
      color: #1d4ed8;
      background: #dbeafe;
    }

    .dz-logout-button {
      color: #dc2626;
      background: #fff;
      border-color: #fee2e2;
    }

    .dz-logout-button:hover {
      color: #b91c1c;
      background: #fef2f2;
    }

    .dz-user-greeting {
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: 190px;
    }

    .dz-user-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      color: #2563eb;
      background: #eff6ff;
      font-size: 17px;
    }

    .dz-user-name {
      overflow: hidden;
      max-width: 125px;
      color: #334155;
      font-size: 13px;
      font-weight: 600;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .dz-menu-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 5px;
      width: 43px;
      height: 43px;
      padding: 10px;
      border: 1px solid #e2e8f0;
      border-radius: 11px;
      background: #fff;
      cursor: pointer;
    }

    .dz-menu-toggle span {
      width: 100%;
      height: 2px;
      border-radius: 5px;
      background: #334155;
      transition: transform 0.2s;
    }

    .dz-menu-toggle.open span:first-child {
      transform: translateY(7px) rotate(45deg);
    }

    .dz-menu-toggle.open span:nth-child(2) {
      opacity: 0;
    }

    .dz-menu-toggle.open span:last-child {
      transform: translateY(-7px) rotate(-45deg);
    }

    @media (max-width: 1100px) {
      .dz-navbar {
        gap: 12px;
        padding: 12px 16px;
      }

      .dz-nav-content {
        gap: 10px;
      }

      .dz-nav-link {
        padding: 10px;
      }

      .dz-nav-actions,
      .dz-user-actions,
      .dz-auth-actions {
        gap: 6px;
      }

      .dz-login-button,
      .dz-signup-button,
      .dz-admin-button,
      .dz-logout-button {
        padding: 9px 10px;
      }
    }

    @media (max-width: 991px) {
      .dz-header {
        padding: 8px 0;
      }

      .dz-navbar {
        flex-wrap: wrap;
        gap: 12px;
        border-radius: 16px;
      }

      .dz-menu-toggle {
        display: flex;
        margin-left: auto;
      }

      .dz-nav-content {
        display: none;
        flex: 0 0 100%;
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding-top: 14px;
        border-top: 1px solid #eef2f7;
      }

      .dz-nav-content.show {
        display: flex;
      }

      .dz-nav-links {
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
      }

      .dz-nav-link {
        display: flex;
        width: 100%;
        padding: 12px 14px;
      }

      .dz-nav-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }

      .dz-cart-link {
        justify-content: center;
        background: #f8fafc;
      }

      .dz-auth-actions,
      .dz-user-actions {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        gap: 8px;
      }

      .dz-user-greeting {
        max-width: 100%;
        padding: 5px 3px;
      }

      .dz-user-name {
        max-width: 100%;
      }

      .dz-login-button,
      .dz-signup-button,
      .dz-admin-button,
      .dz-logout-button {
        width: 100%;
        min-height: 44px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .dz-nav-link,
      .dz-cart-link,
      .dz-login-button,
      .dz-signup-button,
      .dz-admin-button,
      .dz-logout-button,
      .dz-menu-toggle span {
        transition: none;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <header className="dz-header">
        <nav className="dz-navbar container">
          <Link to="/" className="dz-brand" onClick={fermerMenu}>
            <img src={logo} alt="DZShop" />
            <span>
              DZ<span className="dz-brand-accent">Shop</span>
            </span>
          </Link>

          <button
            type="button"
            className={`dz-menu-toggle ${menuOuvert ? "open" : ""}`}
            onClick={() => setMenuOuvert(!menuOuvert)}
            aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOuvert}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`dz-nav-content ${menuOuvert ? "show" : ""}`}>
            <div className="dz-nav-links">
              <NavLink
                to="/"
                end
                className={lienClass}
                onClick={fermerMenu}
              >
                Accueil
              </NavLink>

              <NavLink
                to="/produits"
                className={lienClass}
                onClick={fermerMenu}
              >
                Produits
              </NavLink>

              <NavLink
                to="/contact"
                className={lienClass}
                onClick={fermerMenu}
              >
                Contact
              </NavLink>
            </div>

            <div className="dz-nav-actions">
              <Link
                to="/panier"
                className="dz-cart-link"
                onClick={fermerMenu}
                aria-label={`Panier, ${panier?.length || 0} articles`}
              >
                <i className="bi bi-bag"></i>
                <span>Panier</span>

                {panier?.length > 0 && (
                  <span className="dz-cart-count">
                    {panier.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="dz-user-actions">
                  <span className="dz-user-greeting">
                    <span className="dz-user-avatar">
                      <i className="bi bi-person"></i>
                    </span>

                    <span className="dz-user-name">
                      {user.nom || user.name || user.email}
                    </span>
                  </span>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="dz-admin-button"
                      onClick={fermerMenu}
                    >
                      <i className="bi bi-speedometer2"></i>
                      Admin
                    </Link>
                  )}

                  <button
                    type="button"
                    className="dz-logout-button"
                    onClick={gererDeconnexion}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="dz-auth-actions">
                  <Link
                    to="/connexion"
                    className="dz-login-button"
                    onClick={fermerMenu}
                  >
                    Connexion
                  </Link>

                  <Link
                    to="/signup"
                    className="dz-signup-button"
                    onClick={fermerMenu}
                  >
                    Créer un compte
                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
