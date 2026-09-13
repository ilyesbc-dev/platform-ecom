
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Connexion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Connexion réussie !");

    navigate("/");
  };

  return (
    <div className="container py-5 mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6 col-lg-5">

          <div className="card border-0 shadow">

            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">
                <h1 className="fw-bold">
                  Connexion
                </h1>

                <p className="text-muted">
                  Connectez-vous à votre compte ecorm
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">
                    Adresse email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="exemple@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Mot de passe
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Remember */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                  />

                  <label
                    className="form-check-label"
                    htmlFor="remember"
                  >
                    Se souvenir de moi
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Se connecter
                </button>

              </form>

              <div className="text-center mt-4">

                <p className="mb-0 text-muted">
                  Vous n'avez pas encore de compte ?
                </p>

                <Link
                  to="/signup"
                  className="text-decoration-none fw-bold"
                >
                  Créer un compte
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Connexion;

