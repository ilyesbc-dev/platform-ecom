
import "./App.css";

function LandingPage() {
  return (
    <section
      className="bg-light py-5"
      style={{ marginTop: "56px" }}
    >
      <div className="container py-5">

        <div className="row align-items-center">

          {/* Text */}
          <div className="col-md-6">
            <h1 className="display-4 fw-bold">
              Welcome to My DZ Shop
            </h1>

            <p className="lead">
              Discover our products.
            </p>

            <button className="btn btn-dark">
              Shop Now
            </button>
          </div>

          {/* Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              className="img-fluid rounded floating-img"
              alt="Shop"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default LandingPage;

