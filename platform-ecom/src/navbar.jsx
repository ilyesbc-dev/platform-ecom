function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container">

        <a className="navbar-brand text-white" href="#">
          MyShop
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto">

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

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;