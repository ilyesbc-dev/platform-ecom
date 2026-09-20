
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

  // Si on envoie des données, préciser qu'elles sont en JSON
  if (opts.body) {
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

