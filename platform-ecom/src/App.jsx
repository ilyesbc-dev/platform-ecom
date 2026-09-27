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
        </Routes>

        <Footer />
      </PanierProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;