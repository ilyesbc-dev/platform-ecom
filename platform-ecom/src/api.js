// Adresse de l'API
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Fonction principale pour communiquer avec le backend
export async function apiFetch(chemin, options) {

  const opts = options || {}
  const token = localStorage.getItem('token')

  const headers = { ...(opts.headers || {}) }

  // Ajouter automatiquement le token
  if (token) {
    headers.Authorization = 'Bearer ' + token
  }

  // On précise "JSON" seulement si le corps est du texte (JSON.stringify(...)).
  // Un FormData (envoi de photo, espace admin) ne doit JAMAIS avoir ce Content-Type :
  // le navigateur doit fixer lui-même l'en-tête "multipart/form-data" avec sa frontière.
  if (opts.body && typeof opts.body === 'string') {
    headers['Content-Type'] = 'application/json'
  }

  const reponse = await fetch(
    API_URL + chemin,
    {
      ...opts,
      headers: headers
    }
  )

  // Si le token est expiré ou invalide
  const pageAuth = chemin.startsWith('/api/auth/')

  if (reponse.status === 401 && token && !pageAuth) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/connexion'
  }

  return reponse
}

// Transformer la réponse en JSON
export async function lireJson(reponse) {

  const data = await reponse
    .json()
    .catch(function () {
      return {}
    })

  if (!reponse.ok) {
    throw new Error(
      data.message || 'Erreur ' + reponse.status
    )
  }

  return data
}