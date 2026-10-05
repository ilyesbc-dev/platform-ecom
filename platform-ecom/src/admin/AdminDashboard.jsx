import { useState, useEffect } from 'react'
import { apiFetch, lireJson } from '../api'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

function formatPrix(montant) {
  return Number(montant).toLocaleString('fr-DZ') + ' DA'
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR')
}

// Une petite carte de chiffre clé
function Carte(props) {
  return (
    <div className="col-6 col-xl-3">
      <div className="bg-white rounded-3 shadow-sm p-3 h-100">
        <div className="text-muted small">{props.titre}</div>
        <div className="fs-4 fw-bold">{props.valeur}</div>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(function () {
    apiFetch('/api/admin/stats')
      .then(lireJson)
      .then(setStats)
      .catch(function (err) { setErreur(err.message) })
      .finally(function () { setChargement(false) })
  }, [])

  if (chargement) return <p className="text-secondary">Chargement...</p>
  if (erreur || !stats) return <div className="alert alert-danger">{erreur || 'Erreur'}</div>

  return (
    <>
      <h1 className="h3 mb-4">Tableau de bord</h1>

      <div className="row g-3 mb-4">
        <Carte titre="Chiffre d'affaires (livré)" valeur={formatPrix(stats.chiffreAffaires)} />
        <Carte titre="Commandes" valeur={stats.nbCommandes} />
        <Carte titre="En attente" valeur={stats.enAttente} />
        <Carte titre="Clients" valeur={stats.nbClients} />
      </div>

      <div className="row g-4">
        <div className="col-xl-8">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-3">Ventes des 7 derniers jours</h5>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats.ventes7j}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jour" />
                <YAxis />
                <Tooltip formatter={function (v) { return formatPrix(v) }} />
                <Bar dataKey="ventes" fill="#0d6efd" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-3">Produits les plus vendus</h5>
            {stats.topProduits.length === 0 && <p className="text-muted mb-0">Pas encore de vente livrée.</p>}
            {stats.topProduits.map(function (p, index) {
              return (
                <div className="d-flex justify-content-between mb-2" key={index}>
                  <span>#{index + 1} {p.nom}</span>
                  <b>{p.quantite}</b>
                </div>
              )
            })}
          </div>
        </div>

        <div className="col-xl-7">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-3">Dernières commandes</h5>
            {stats.dernieresCommandes.length === 0 && <p className="text-muted mb-0">Aucune commande.</p>}
            {stats.dernieresCommandes.map(function (c) {
              return (
                <div className="d-flex justify-content-between align-items-center border-bottom py-2" key={c._id}>
                  <span>
                    <b>{c.client}</b>
                    <small className="text-muted"> · {formatDate(c.createdAt)}</small>
                  </span>
                  <span>{formatPrix(c.total)} <span className="badge text-bg-secondary">{c.statut}</span></span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="col-xl-5">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-3">⚠️ Stock faible (5 ou moins)</h5>
            {stats.stockFaible.length === 0 && <p className="text-muted mb-0">Tout va bien.</p>}
            {stats.stockFaible.map(function (p) {
              return (
                <div className="d-flex justify-content-between mb-2" key={p._id}>
                  <span>{p.nom}</span>
                  <span className={'badge text-bg-' + (p.stock === 0 ? 'danger' : 'warning')}>{p.stock}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard