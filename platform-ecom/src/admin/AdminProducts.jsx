import { useState, useEffect } from 'react'
import { apiFetch, lireJson } from '../api'

const VIDE = { nom: '', description: '', prix: '', categorie: '', stock: '', image: '' }

function AdminProducts() {
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  const [form, setForm] = useState(VIDE)
  const [modificationId, setModificationId] = useState(null)
  const [fichier, setFichier] = useState(null)
  const [envoi, setEnvoi] = useState(false)

  function charger() {
    apiFetch('/api/products')
      .then(lireJson)
      .then(setProduits)
      .catch(function (err) { setErreur(err.message) })
      .finally(function () { setChargement(false) })
  }

  useEffect(charger, [])

  function changer(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function modifier(produit) {
    setModificationId(produit._id)
    setForm({
      nom: produit.nom,
      description: produit.description || '',
      prix: produit.prix,
      categorie: produit.categorie || '',
      stock: produit.stock,
      image: produit.image || '',
    })
    setFichier(null)
  }

  function annuler() {
    setModificationId(null)
    setForm(VIDE)
    setFichier(null)
  }

  async function envoyerPhoto() {
    const donnees = new FormData()
    donnees.append('image', fichier)
    // Attention : PAS de Content-Type ici, api.js le laisse au navigateur pour un FormData
    const reponse = await apiFetch('/api/upload', { method: 'POST', body: donnees })
    const data = await lireJson(reponse)
    return data.imageUrl
  }

  async function valider(e) {
    e.preventDefault()
    setErreur('')
    setEnvoi(true)

    try {
      let image = form.image

      if (fichier) {
        image = await envoyerPhoto()
      }

      const corps = {
        nom: form.nom,
        description: form.description,
        prix: Number(form.prix),
        categorie: form.categorie,
        stock: Number(form.stock),
        image: image,
      }

      if (modificationId) {
        const reponse = await apiFetch('/api/products/' + modificationId, {
          method: 'PUT',
          body: JSON.stringify(corps),
        })
        await lireJson(reponse)
      } else {
        const reponse = await apiFetch('/api/products', {
          method: 'POST',
          body: JSON.stringify(corps),
        })
        await lireJson(reponse)
      }

      annuler()
      charger()
    } catch (err) {
      setErreur(err.message)
    }
    setEnvoi(false)
  }

  async function supprimer(id) {
    if (!window.confirm('Supprimer ce produit ?')) return
    try {
      const reponse = await apiFetch('/api/products/' + id, { method: 'DELETE' })
      await lireJson(reponse)
      charger()
    } catch (err) {
      setErreur(err.message)
    }
  }

  if (chargement) return <p className="text-secondary">Chargement...</p>

  return (
    <>
      <h1 className="h3 mb-4">Produits</h1>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
        <h5 className="mb-3">{modificationId ? 'Modifier le produit' : 'Ajouter un produit'}</h5>
        <form onSubmit={valider}>
          <div className="row g-2">
            <div className="col-md-6">
              <input className="form-control" name="nom" placeholder="Nom" value={form.nom} onChange={changer} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="categorie" placeholder="Catégorie" value={form.categorie} onChange={changer} />
            </div>
            <div className="col-md-6">
              <input className="form-control" type="number" min="0" name="prix" placeholder="Prix (DA)" value={form.prix} onChange={changer} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" type="number" min="0" name="stock" placeholder="Stock" value={form.stock} onChange={changer} required />
            </div>
            <div className="col-12">
              <textarea className="form-control" name="description" placeholder="Description" value={form.description} onChange={changer}></textarea>
            </div>
            <div className="col-12">
              <label className="form-label small text-muted">Photo du produit</label>
              <input className="form-control" type="file" accept="image/*" onChange={function (e) { setFichier(e.target.files[0]) }} />
              {form.image && !fichier && (
                <img src={form.image} alt="" style={{ height: '60px', marginTop: '8px', objectFit: 'contain' }} />
              )}
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-primary" disabled={envoi}>
              {envoi ? 'Envoi...' : modificationId ? 'Enregistrer' : 'Ajouter'}
            </button>
            {modificationId && (
              <button type="button" className="btn btn-outline-secondary" onClick={annuler}>
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-3">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {produits.map(function (p) {
              return (
                <tr key={p._id}>
                  <td>
                    <img src={p.image} alt={p.nom} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  </td>
                  <td>{p.nom}</td>
                  <td>{p.categorie}</td>
                  <td>{p.prix} DA</td>
                  <td>{p.stock}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={function () { modifier(p) }}>
                      Modifier
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={function () { supprimer(p._id) }}>
                      Supprimer
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

export default AdminProducts