
import { useEffect, useRef } from "react";

const ADRESSE_SCRIPT = "https://accounts.google.com/gsi/client";

function GoogleSignInButton({ onCredential }) {
  const conteneur = useRef(null);
  const dernierCallback = useRef(onCredential);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    dernierCallback.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    if (!clientId) return;

    const afficherLeBouton = () => {
      if (!window.google || !conteneur.current) return;

      // Avoid rendering the button multiple times
      conteneur.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (reponse) => {
          dernierCallback.current?.(reponse.credential);
        },
      });

      window.google.accounts.id.renderButton(conteneur.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        width: 320,
      });
    };

    if (window.google) {
      afficherLeBouton();
      return;
    }

    let script = document.querySelector(
      `script[src="${ADRESSE_SCRIPT}"]`
    );

    if (!script) {
      script = document.createElement("script");
      script.src = ADRESSE_SCRIPT;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", afficherLeBouton);

    return () => {
      script.removeEventListener("load", afficherLeBouton);
    };
  }, [clientId]);

  if (!clientId) {
    return (
      <p className="text-muted small text-center mb-0">
        Connexion Google non configurée.
      </p>
    );
  }

  return (
    <div
      ref={conteneur}
      className="d-flex justify-content-center"
    />
  );
}

export default GoogleSignInButton;

