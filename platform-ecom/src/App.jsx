import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./navbar";
import LandingPage from "./LandingPage";
import Produits from "./produit";
import ProduitDetails from "./ProduitDetails";
import Panier, { PanierProvider } from "./panier";
import Footer from "./footer";
import Contact from "./contact";
import Connexion from "./connection";
import Signup from "./Signup";
import CheckoutPage from "./CheckoutPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import { AuthProvider } from "./AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <PanierProvider>
        <NavBar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/produits"
            element={<Produits />}
          />
<Route path="/connexion" element={<Connexion />} />
<Route path="/signup" element={<Signup />} />
          <Route
            path="/produit/:id"
            element={<ProduitDetails />}
          />

          <Route
            path="/panier"
            element={<Panier />}
          />

          {/* protégée : il faut être connecté */}
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />

          {/* Espace admin : protégé, réservé au rôle "admin" */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="produits" element={<AdminProducts />} />
            <Route path="commandes" element={<AdminOrders />} />
            <Route path="utilisateurs" element={<AdminUsers />} />
          </Route>
        </Routes>

        <Footer />
      </PanierProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;