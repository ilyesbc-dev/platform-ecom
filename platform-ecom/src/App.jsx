import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./navbar";
import LandingPage from "./LandingPage";
import Produits from "./produit";
import ProduitDetails from "./ProduitDetails";
import Panier, { PanierProvider } from "./panier";
import Footer from "./footer";

function App() {
  return (
    <BrowserRouter>
      <PanierProvider>
        <NavBar />

        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/produits"
            element={<Produits />}
          />

          <Route
            path="/produit/:id"
            element={<ProduitDetails />}
          />

          <Route
            path="/panier"
            element={<Panier />}
          />
        </Routes>

        <Footer />
      </PanierProvider>
    </BrowserRouter>
  );
}

export default App;