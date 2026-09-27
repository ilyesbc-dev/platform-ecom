import { useState } from "react";
import { Link } from "react-router-dom";
import { usePanier } from "./panier";
import { useAuth } from "./AuthContext";
import { apiFetch, lireJson } from "./api";

function CheckoutPage() {
  const { panier, total, viderPanier } = usePanier();
  const { user } = useAuth();

  const [telephone, setTelephone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [adresse, setAdresse] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [commande, setCommande] = useState(null); // la commande créée par le serveur

  async function commander(e) {
    e.preventDefault();
    setErreur("");
    setEnvoi(true);

    try {
      // On envoie SEULEMENT quel produit et combien : le SERVEUR retrouve les vrais prix
      const reponse = await apiFetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          articles: panier.map(function (item) {
            return { produit: item._id, quantite: item.quantite };
          }),
          telephone: telephone,
          wilaya: wilaya,
          adresse: adresse,
        }),
      });
      const data = await lireJson(reponse);
      setCommande(data);
      viderPanier();
    } catch (err) {
      setErreur(err.message);
    }
    setEnvoi(false);
  }

  // Écran de confirmation (après la commande)
  if (commande) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="display-1">✅</div>
        <h1>Commande confirmée !</h1>
        <p className="text-secondary">
          Merci {user.nom}, tu seras livré(e) bientôt. Total :{" "}
          <b>{commande.total} DA</b>
        </p>
        <Link className="btn btn-primary" to="/produits">
          Continuer mes achats
        </Link>
      </div>
    );
  }

  if (panier.length === 0) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <p className="text-secondary">Ton panier est vide.</p>
        <Link className="btn btn-primary" to="/produits">
          Voir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4">Livraison</h1>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <form onSubmit={commander}>
        <input
          className="form-control mb-3"
          placeholder="Téléphone"
          value={telephone}
          onChange={function (e) { setTelephone(e.target.value); }}
          required
        />
        <input
          className="form-control mb-3"
          placeholder="Wilaya (ex : Skikda)"
          value={wilaya}
          onChange={function (e) { setWilaya(e.target.value); }}
          required
        />
        <textarea
          className="form-control mb-3"
          placeholder="Adresse détaillée"
          value={adresse}
          onChange={function (e) { setAdresse(e.target.value); }}
          required
        ></textarea>

        <p>Total : <b>{total} DA</b></p>
        <p className="text-secondary small">Le total final est recalculé par le serveur.</p>

        <button className="btn btn-success btn-lg w-100" disabled={envoi}>
          {envoi ? "Envoi en cours..." : "Confirmer la commande"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;