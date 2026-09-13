
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    alert("Compte créé avec succès !");

    navigate("/connexion");
  };

  return (
    <div className="container py-5 mt-5">

      <div className="row justify-content-center">

        <div className="col-md-7 col-lg-6">

          <div className="card border-0 shadow">

            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">

                <h1 className="fw-bold">
                  Créer un compte
                </h1>

                <p className="text-muted">
                  Rejoignez ecorm gratuitement
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">

                  <label className="form-label">
                    Nom complet
                  </label>

                  <input
                    type="text"
                    name="nom"
                    className="form-control"
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />

                </div>

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
                    placeholder="Créer un mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                  />

                </div>

                {/* Confirm password */}
                <div className="mb-4">

                  <label className="form-label">
                    Confirmer le mot de passe
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirmer votre mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength="6"
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Créer mon compte
                </button>

              </form>

              <div className="text-center mt-4">

                <p className="mb-0 text-muted">
                  Vous avez déjà un compte ?
                </p>

                <Link
                  to="/connexion"
                  className="text-decoration-none fw-bold"
                >
                  Se connecter
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;

