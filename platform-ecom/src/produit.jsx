import Card from "./card";
import { produits } from "./produits";

function Produits() {
  return (
    <section className="container my-5 pt-5">

      <h2 className="text-center mb-4">
        Nos produits
      </h2>

      <div className="row g-4">

        {produits.map((produit) => (
          <div
            className="col-md-6 col-lg-4"
            key={produit.id}
          >
            <Card produit={produit} />
          </div>
        ))}

      </div>

    </section>
  );
}

export default Produits;