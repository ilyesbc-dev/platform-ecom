import { useState, useEffect } from 'react'
import { apiFetch, lireJson } from '../api'

const STATUTS = ['En attente', 'Expédiée', 'Livrée', 'Annulée']

function AdminOrders() {
  const [commandes, setCommandes] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  function charger() {
    apiFetch('/api/orders')
      .then(lireJson)
      .then(setCommandes)
      .catch(function (err) { setErreur(err.message) })
      .finally(function () { setChargement(false) })
  }

  useEffect(charger, [])

  async function changerStatut(id, statut) {
    try {
      const reponse = await apiFetch('/api/orders/' + id + '/statut', {
        method: 'PATCH',
        body: JSON.stringify({ statut: statut }),
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
      <h1 className="h3 mb-4">Commandes</h1>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <div className="bg-white rounded-3 shadow-sm p-3">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Client</th>
              <th>Total</th>
              <th>Wilaya</th>
              <th>Téléphone</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map(function (c) {
              return (
                <tr key={c._id}>
                  <td>{c.client}</td>
                  <td>{c.total} DA</td>
                  <td>{c.wilaya}</td>
                  <td>{c.telephone}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={c.statut}
                      onChange={function (e) { changerStatut(c._id, e.target.value) }}
                    >
                      {STATUTS.map(function (s) {
                        return <option key={s} value={s}>{s}</option>
                      })}
                    </select>
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

export default AdminOrders