
import { Link } from "react-router-dom";
import logo from "./assets/img3.png";

function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{
        background: "linear-gradient(135deg, #0f172a, #111827)",
      }}
    >
      <div className="container py-5">
        <div className="row g-5">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <Link
              to="/"
              className="text-decoration-none text-white d-flex align-items-center gap-2 mb-4"
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                <img
                  src={logo}
                  width="36"
                  height="36"
                  style={{ objectFit: "contain" }}
                  alt="DZShop Logo"
                />
              </div>

              <span className="fw-bold fs-4">
                DZ<span className="text-primary">ECORM</span>
              </span>
            </Link>

            <p className="text-white-50 lh-lg" style={{ maxWidth: "350px" }}>
              Your favorite online shop for quality products,
              great prices, and a simple shopping experience.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-2 mt-4">
              <a
                href="#"
                className="btn btn-outline-light rounded-circle"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="#"
                className="btn btn-outline-light rounded-circle"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="#"
                className="btn btn-outline-light rounded-circle"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-uppercase mb-4">
              Shop
            </h6>

            <div className="d-flex flex-column gap-3">
              <Link
                to="/produits"
                className="text-white-50 text-decoration-none"
              >
                Products
              </Link>

              <Link
                to="/produits"
                className="text-white-50 text-decoration-none"
              >
                New Arrivals
              </Link>

              <Link
                to="/produits"
                className="text-white-50 text-decoration-none"
              >
                Best Sellers
              </Link>

              <Link
                to="/produits"
                className="text-white-50 text-decoration-none"
              >
                Discounts
              </Link>
            </div>
          </div>

          {/* Information */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-uppercase mb-4">
              Information
            </h6>

            <div className="d-flex flex-column gap-3">
              <Link
                to="/"
                className="text-white-50 text-decoration-none"
              >
                About Us
              </Link>

              <a
                href="#"
                className="text-white-50 text-decoration-none"
              >
                Delivery
              </a>

              <a
                href="#"
                className="text-white-50 text-decoration-none"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-white-50 text-decoration-none"
              >
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold text-uppercase mb-4">
              Contact
            </h6>

            <div className="d-flex flex-column gap-3 text-white-50">
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-geo-alt-fill text-primary"></i>
                <span>Algeria</span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-telephone-fill text-primary"></i>
                <span>+213 675 193 505</span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-envelope-fill text-primary"></i>
                <span>ilyesbouchaala21@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="border-top border-secondary"
        style={{ background: "rgba(0,0,0,0.25)" }}
      >
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <p className="mb-0 text-white-50 small">
              © 2026 DZECORM All rights reserved.
            </p>

           
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

