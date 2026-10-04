import { createContext, useContext, useState, useEffect } from 'react'
import { apiFetch, lireJson } from './api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Au démarrage, on relit l'utilisateur sauvegardé : un F5 ne déconnecte plus
  const [user, setUser] = useState(function () {
    try {
      const sauvegarde = localStorage.getItem('user')
      return sauvegarde ? JSON.parse(sauvegarde) : null
    } catch (erreur) {
      return null
    }
  })

  function sauvegarder(donnees) {
    localStorage.setItem('token', donnees.token)
    localStorage.setItem('user', JSON.stringify(donnees.user))
    setUser(donnees.user)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(function () {
    if (!localStorage.getItem('token')) return

    apiFetch('/api/auth/me')
      .then(lireJson)
      .then(function (data) {
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
      })
      .catch(function () {
        // Le 401 est déjà géré par l'intercepteur de api.js
      })
  }, [])

  async function login(email, password) {
    const reponse = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    })
    const data = await lireJson(reponse)
    sauvegarder(data)
    return data.user
  }

  async function register(nom, email, password) {
    const reponse = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nom: nom, email: email, password: password }),
    })
    const data = await lireJson(reponse)
    sauvegarder(data)
    return data.user
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}