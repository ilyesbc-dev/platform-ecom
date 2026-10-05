import { NavLink, Outlet } from 'react-router-dom'

// Le "cadre" de l'espace admin : un menu à gauche, et à droite la page choisie.
// <Outlet /> = l'endroit où s'affiche la page enfant (Tableau de bord, Produits, ...)
function AdminLayout() {
  function classeLien(info) {
    return 'list-group-item list-group-item-action' + (info.isActive ? ' active' : '')
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row g-4">
        <div className="col-md-3 col-lg-2">
          <div className="list-group shadow-sm">
            <NavLink className={classeLien} to="/admin" end>
              📊 Tableau de bord
            </NavLink>
            <NavLink className={classeLien} to="/admin/produits">
              🛍️ Produits
            </NavLink>
            <NavLink className={classeLien} to="/admin/commandes">
              📦 Commandes
            </NavLink>
            <NavLink className={classeLien} to="/admin/utilisateurs">
              👥 Utilisateurs
            </NavLink>
          </div>
        </div>

        <div className="col-md-9 col-lg-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout