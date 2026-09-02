
import "./App.css";

function LandingPage() {
  return (
    <section
      className="landing-section bg-light"
      style={{ marginTop: "56px" }}
    >
      <div className="container py-5">
        <div className="row align-items-center min-vh-75">

          {/* TEXT */}
          <div className="col-md-6 text-center text-md-start">

            {/* Small Badge */}
            <span className="badge bg-dark px-3 py-2 mb-3">
              🇩🇿 Welcome to My DZ Shop
            </span>

            <h1 className="display-3 fw-bold mb-4">
              Discover Your
              <br />
              <span className="text-dark">Favorite Products</span>
            </h1>

            <p className="lead text-secondary mb-4">
              Discover quality products at great prices.
              <br />
              Shop easily, quickly, and safely with My DZ Shop.
            </p>

            {/* Buttons */}
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">

              <button className="btn btn-dark btn-lg px-4 shadow">
                Discover Our Products
                <i className="bi bi-arrow-right ms-2"></i>
              </button>

              <button className="btn btn-outline-dark btn-lg px-4">
                <i className="bi bi-cart3 me-2"></i>
                Shop Now
              </button>

            </div>

            {/* Small Features */}
            <div className="d-flex gap-4 mt-5 justify-content-center justify-content-md-start">

              <div>
                <i className="bi bi-truck fs-4"></i>
                <small className="d-block text-secondary">
                  Fast Delivery
                </small>
              </div>

              <div>
                <i className="bi bi-shield-check fs-4"></i>
                <small className="d-block text-secondary">
                  Secure Shopping
                </small>
              </div>

              <div>
                <i className="bi bi-star fs-4"></i>
                <small className="d-block text-secondary">
                  Quality Products
                </small>
              </div>

            </div>

          </div>


          {/* IMAGE */}
          <div className="col-md-6 text-center mt-5 mt-md-0">

            <div className="hero-image-wrapper">

              {/* Floating Circle */}
              <div className="floating-badge">
                <i className="bi bi-bag-heart"></i>
              </div>

              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                className="img-fluid rounded-4 shadow-lg floating-img"
                alt="My DZ Shop"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default LandingPage;

