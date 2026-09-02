
function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container">

        {/* Logo + MyShop */}
        <a
          className="navbar-brand text-white d-flex align-items-center gap-2"
          href="#"
        >
          <img
            src="/src/assets/img3.png"
            alt="MyShop Logo"
            width="35"
            height="35"
            style={{ objectFit: "contain" }}
          />

          DZShop
        </a>


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

            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Product
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Blog
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Contact
              </a>
            </li>


            {/* 🛒 Panier */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">

              <a
                href="/cart"
                className="btn btn-light d-flex align-items-center gap-2"
              >
                <i className="bi bi-cart3"></i>
                🛒 Panier
              </a>

            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default NavBar;

