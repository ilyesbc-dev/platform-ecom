import { useState, useEffect } from 'react'
import { apiFetch, lireJson } from '../api'
import { useAuth } from '../AuthContext'

function AdminUsers() {
  const { user } = useAuth()
  const [utilisateurs, setUtilisateurs] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  function charger() {
    apiFetch('/api/admin/users')
      .then(lireJson)
      .then(setUtilisateurs)
      .catch(function (err) { setErreur(err.message) })
      .finally(function () { setChargement(false) })
  }

  useEffect(charger, [])

  async function changerStatut(u) {
    const nouveau = u.status === 'bloque' ? 'actif' : 'bloque'
    try {
      const reponse = await apiFetch('/api/admin/users/' + u._id + '/status', {
        method: 'PATCH',
        body: JSON.stringify({ status: nouveau }),
      })
      await lireJson(reponse)
      charger()
    } catch (err) {
      setErreur(err.message)
    }
  }

  async function changerRole(u) {
    const nouveau = u.role === 'admin' ? 'client' : 'admin'
    if (!window.confirm('Faire de ' + u.nom + (nouveau === 'admin' ? ' un admin' : ' un client simple') + ' ?')) return
    try {
      const reponse = await apiFetch('/api/admin/users/' + u._id + '/role', {
        method: 'PATCH',
        body: JSON.stringify({ role: nouveau }),
      })
      await lireJson(reponse)
      charger()
    } catch (err) {
      setErreur(err.message)
    }
  }

  if (chargement) return <p className="text-secondary">Chargement...</p>

  return (
    <>
      <h1 className="h3 mb-4">Utilisateurs</h1>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <div className="bg-white rounded-3 shadow-sm p-3">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Commandes</th>
              <th>Dépensé</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map(function (u) {
              const soiMeme = user && String(user.id) === String(u._id)
              return (
                <tr key={u._id}>
                  <td>{u.nom} {soiMeme && <span className="badge text-bg-info">toi</span>}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={'badge text-bg-' + (u.role === 'admin' ? 'dark' : 'secondary')}>{u.role}</span>
                  </td>
                  <td>
                    <span className={'badge text-bg-' + (u.status === 'bloque' ? 'danger' : 'success')}>{u.status}</span>
                  </td>
                  <td>{u.nbCommandes}</td>
                  <td>{u.totalDepense} DA</td>
                  <td className="text-end">
                    {/* Garde-fou visuel : un admin ne peut pas s'auto-modifier. Le serveur
                        refuse déjà la requête même si on force le bouton depuis F12. */}
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      disabled={soiMeme}
                      onClick={function () { changerRole(u) }}
                    >
                      {u.role === 'admin' ? 'Retirer admin' : 'Rendre admin'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      disabled={soiMeme}
                      onClick={function () { changerStatut(u) }}
                    >
                      {u.status === 'bloque' ? 'Débloquer' : 'Bloquer'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminUsers