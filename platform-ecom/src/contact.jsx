
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Votre message a été envoyé !");

    setFormData({
      nom: "",
      email: "",
      sujet: "",
      message: ""
    });
  };

  return (
    <div className="container py-5 mt-5">

      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contactez-nous</h1>

        <p className="text-muted">
          Une question ou un problème ? Notre équipe est là pour vous aider.
        </p>
      </div>

      <div className="row g-5">

        {/* Contact information */}
        <div className="col-md-5">

          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                Nos coordonnées
              </h3>

              <div className="mb-4">
                <h6 className="fw-bold">📍 Adresse</h6>
                <p className="text-muted">
                  Skikda, Algérie
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">📧 Email</h6>
                <p className="text-muted">
                  ilyesbouchaala21@gmail.com
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">📞 Téléphone</h6>
                <p className="text-muted">
                  +213 675193505
                </p>
              </div>

              <div>
                <h6 className="fw-bold">🕐 Horaires</h6>
                <p className="text-muted mb-1">
                  Dimanche - Jeudi
                </p>
                <p className="text-muted">
                  09:00 - 17:00
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Contact form */}
        <div className="col-md-7">

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                Envoyez-nous un message
              </h3>

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Nom
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
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <label className="form-label">
                    Sujet
                  </label>

                  <input
                    type="text"
                    name="sujet"
                    className="form-control"
                    placeholder="Sujet de votre message"
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="form-label">
                    Message
                  </label>

                  <textarea
                    name="message"
                    className="form-control"
                    rows="6"
                    placeholder="Écrivez votre message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Envoyer le message
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;

