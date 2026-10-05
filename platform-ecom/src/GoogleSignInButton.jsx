import { useEffect, useRef } from 'react'

const ADRESSE_SCRIPT = 'https://accounts.google.com/gsi/client'

// Le bouton officiel « Continuer avec Google ».
// Google nous renvoie un "credential" (un jeton signé) : on le passe à la fonction onCredential.
function GoogleSignInButton(props) {
  const conteneur = useRef(null)
  const dernierCallback = useRef(props.onCredential)
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  dernierCallback.current = props.onCredential

  useEffect(
    function () {
      if (!clientId) return

      function afficherLeBouton() {
        if (!window.google || !conteneur.current) return

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: function (reponse) {
            dernierCallback.current(reponse.credential)
          },
        })
        window.google.accounts.id.renderButton(conteneur.current, {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          width: 320,
        })
      }

      if (window.google) {
        afficherLeBouton()
        return
      }

      let script = document.querySelector('script[src="' + ADRESSE_SCRIPT + '"]')
      if (!script) {
        script = document.createElement('script')
        script.src = ADRESSE_SCRIPT
        script.async = true
        document.head.appendChild(script)
      }
      script.addEventListener('load', afficherLeBouton)

      return function () {
        script.removeEventListener('load', afficherLeBouton)
      }
    },
    [clientId]
  )

  if (!clientId) {
    return <p className="text-muted small text-center mb-0">Connexion Google non configurée (variable VITE_GOOGLE_CLIENT_ID manquante).</p>
  }

  return <div ref={conteneur} className="d-flex justify-content-center"></div>
}

export default GoogleSignInButton