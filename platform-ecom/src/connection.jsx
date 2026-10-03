import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import GoogleSignInButton from "./GoogleSignInButton";

function Connexion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginGoogle } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  const destination = (location.state && location.state.from) || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setEnvoi(true);

    try {
      // Vrai appel à l'API : le compte est vérifié dans MongoDB
      await login(formData.email, formData.password);
      navigate(destination, { replace: true });
    } catch (err) {
      setErreur(err.message);
    }
    setEnvoi(false);
  };

  // Appelée par le bouton Google avec le jeton reçu de Google
  const connexionGoogle = async (credential) => {
    setErreur("");
    try {
      await loginGoogle(credential);
      navigate(destination, { replace: true });
    } catch (err) {
      setErreur(err.message);
    }
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
      {/* Decorative circle - top left */}
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
      ></div>

      {/* Decorative circle - bottom right */}
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
      ></div>

      <div
        className="container py-5"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5 col-xl-4">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(12px)",
                marginTop: "70px",
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
                    👋
                  </div>

                  <h1 className="fw-bold mb-2">
                    Bienvenue !
                  </h1>

                  <p className="text-muted mb-0">
                    Connectez-vous à votre compte{" "}
                    <strong>ecorm</strong>
                  </p>
                </div>

                {erreur && (
                  <div className="alert alert-danger">{erreur}</div>
                )}

                <form onSubmit={handleSubmit}>

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
                      placeholder="Votre mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #dee2e6",
                      }}
                    />
                  </div>

                  {/* Remember */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                      />

                      <label
                        className="form-check-label text-muted"
                        htmlFor="remember"
                      >
                        Se souvenir de moi
                      </label>
                    </div>

                    <a
                      href="#"
                      className="text-decoration-none small fw-semibold"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-semibold"
                    disabled={envoi}
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
                    {envoi ? "Connexion..." : "Se connecter"}
                  </button>
                </form>

                <div className="text-center text-muted my-3">— ou —</div>
                <GoogleSignInButton onCredential={connexionGoogle} />

                {/* Signup */}
                <div className="text-center mt-4">
                  <p className="mb-2 text-muted">
                    Vous n'avez pas encore de compte ?
                  </p>

                  <Link
                    to="/signup"
                    className="fw-bold text-decoration-none"
                    style={{
                      color: "#0d6efd",
                    }}
                  >
                    Créer un compte →
                  </Link>
                </div>

              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-muted mt-4 small">
              Bienvenue sur ecorm 🛍️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;