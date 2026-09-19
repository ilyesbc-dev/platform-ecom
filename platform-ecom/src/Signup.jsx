
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8f9ff 45%, #e8f0ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(13, 110, 253, 0.12)",
          top: "-100px",
          left: "-80px",
        }}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(111, 66, 193, 0.10)",
          bottom: "-180px",
          right: "-120px",
        }}
      />

      <div
        className="container py-5"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(12px)",
                marginTop: "40px",
              }}
            >
              <div className="card-body p-4 p-md-5">

                {/* Header */}
                <div className="text-center mb-4">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "20px",
                      background:
                        "linear-gradient(135deg, #0d6efd, #6f42c1)",
                      color: "white",
                      fontSize: "28px",
                      boxShadow:
                        "0 10px 25px rgba(13, 110, 253, 0.25)",
                    }}
                  >
                    🛍️
                  </div>

                  <h1 className="fw-bold mb-2">
                    Créer un compte
                  </h1>

                  <p className="text-muted mb-0">
                    Rejoignez <strong>ecorm</strong> gratuitement
                  </p>
                </div>

                <form onSubmit={handleSubmit}>

                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Nom complet
                    </label>

                    <input
                      type="text"
                      name="nom"
                      className="form-control form-control-lg"
                      placeholder="Votre nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #dee2e6",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Adresse email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="exemple@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #dee2e6",
                      }}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Mot de passe
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Créer un mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      required
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #dee2e6",
                      }}
                    />
                  </div>

                  {/* Confirm password */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirmer le mot de passe
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      placeholder="Confirmer votre mot de passe"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      minLength={6}
                      required
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #dee2e6",
                      }}
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-semibold"
                    style={{
                      borderRadius: "12px",
                      padding: "13px",
                      border: "none",
                      background:
                        "linear-gradient(135deg, #0d6efd, #6f42c1)",
                      boxShadow:
                        "0 8px 20px rgba(13, 110, 253, 0.25)",
                    }}
                  >
                    Créer mon compte
                  </button>
                </form>

                {/* Login link */}
                <div className="text-center mt-4">
                  <p className="mb-2 text-muted">
                    Vous avez déjà un compte ?
                  </p>

                  <Link
                    to="/connexion"
                    className="fw-bold text-decoration-none"
                    style={{
                      color: "#0d6efd",
                    }}
                  >
                    Se connecter →
                  </Link>
                </div>

              </div>
            </div>

            <p className="text-center text-muted mt-4 small">
              En créant un compte, vous acceptez nos conditions
              d'utilisation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

