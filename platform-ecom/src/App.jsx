
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

          {/* Navigation */}
          <NavBar />

          <Routes>
            {/* ==================== PUBLIC ==================== */}

            {/* Home */}
            <Route
              path="/"
              element={<LandingPage />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Products */}
            <Route
              path="/produits"
              element={<Produits />}
            />

            {/* Product details */}
            <Route
              path="/produit/:id"
              element={<ProduitDetails />}
            />

            {/* Cart */}
            <Route
              path="/panier"
              element={<Panier />}
            />

            {/* Login */}
            <Route
              path="/connexion"
              element={<Connexion />}
            />

            {/* Signup */}
            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* ==================== CHECKOUT ==================== */}

            {/* User must be logged in */}
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />

            {/* ==================== ADMIN ==================== */}

            {/* 
              Admin area
              Only authenticated users with role === "admin"
              can access these pages.
            */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              {/* /admin */}
              <Route
                index
                element={<AdminDashboard />}
              />

              {/* /admin/produits */}
              <Route
                path="produits"
                element={<AdminProducts />}
              />

              {/* /admin/commandes */}
              <Route
                path="commandes"
                element={<AdminOrders />}
              />

              {/* /admin/utilisateurs */}
              <Route
                path="utilisateurs"
                element={<AdminUsers />}
              />
            </Route>
          </Routes>

          {/* Footer */}
          <Footer />

        </PanierProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

