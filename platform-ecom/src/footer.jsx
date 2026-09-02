
function Footer() {
  return (
    <footer className="bg-dark text-white">

      <div className="container-fluid p-5">

        <div className="row">

          {/* Logo */}
          <div className="col-lg-3 col-md-6 mb-4">

            <div
              className="rounded-circle bg-white d-flex align-items-center justify-content-center mb-4 mx-auto"
              style={{ width: "120px", height: "120px" }}
            >
              <img
                src="src/assets/img3.png"
                height="60"
                alt="Logo"
              />
            </div>

            <p className="text-center">
              Your favorite online shop for quality products.
            </p>

          </div>

          {/* Shop */}
          <div className="col-lg-3 col-md-6 mb-4">

            <h5 className="text-uppercase mb-4">
             DZ Shop
            </h5>

            <p>
              <a href="#" className="text-white text-decoration-none">
                Products
              </a>
            </p>

            <p>
              <a href="#" className="text-white text-decoration-none">
                New Arrivals
              </a>
            </p>

            <p>
              <a href="#" className="text-white text-decoration-none">
                Best Sellers
              </a>
            </p>

            <p>
              <a href="#" className="text-white text-decoration-none">
                Discounts
              </a>
            </p>

          </div>

          {/* Information */}
          <div className="col-lg-3 col-md-6 mb-4">

            <h5 className="text-uppercase mb-4">
              Information
            </h5>

            <p>
              <a href="#" className="text-white text-decoration-none">
                About Us
              </a>
            </p>

            <p>
              <a href="#" className="text-white text-decoration-none">
                Delivery
              </a>
            </p>

            <p>
              <a href="#" className="text-white text-decoration-none">
                Privacy Policy
              </a>
            </p>

            <p>
              <a href="#" className="text-white text-decoration-none">
                Terms & Conditions
              </a>
            </p>

          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4">

            <h5 className="text-uppercase mb-4">
              Contact
            </h5>

            <p>📍 Algeria</p>
            <p>📞 +213 675193505</p>
            <p>✉️ ilyesbouchaala21@gmail.com</p>

          </div>

        </div>

      </div>

      {/* Copyright */}
      <div className="text-center p-3 bg-black">
        © 2026 MyShop. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;

