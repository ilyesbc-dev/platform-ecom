import Card from "./card";

import tshirt from "./assets/t-shirt.png";
import basket from "./assets/Shoes for Men.png";
import jeans from "./assets/jeans.png";
import casquette from "./assets/Casquette Homme Noir.png";
import lunettes from "./assets/lunettes.png";
import sweat from "./assets/sweat-shirt.png";
import veste from "./assets/veste.png";
import adidas from "./assets/adidas.png";
import laptop from "./assets/Laptop Rucksack.png";
import montre from "./assets/montre.png";

function Produits() {
  const produits = [
    {
      id: 1,
      nom: "T-shirt",
      description: "T-shirt confortable en coton",
      prix: 899,
      img: tshirt,
    },
    {
      id: 2,
      nom: "Basket",
      description: "Baskets modernes et confortables",
      prix: 599,
      img: basket,
    },
    {
      id: 3,
      nom: "Jeans",
      description: "Jeans moderne et élégant",
      prix: 1999,
      img: jeans,
    },
    {
      id: 4,
      nom: "Casquette",
      description: "Casquette homme noire",
      prix: 799,
      img: casquette,
    },
    {
      id: 5,
      nom: "Lunettes",
      description: "Lunettes modernes",
      prix: 1299,
      img: lunettes,
    },
    {
      id: 6,
      nom: "Sweat-shirt",
      description: "Sweat-shirt confortable",
      prix: 2499,
      img: sweat,
    },
    {
      id: 7,
      nom: "Veste",
      description: "Veste élégante et moderne",
      prix: 3499,
      img: veste,
    },
    {
      id: 8,
      nom: "Adidas",
      description: "Chaussures Adidas",
      prix: 5999,
      img: adidas,
    },
    {
      id: 9,
      nom: "Laptop Rucksack",
      description: "Sac à dos pour ordinateur portable",
      prix: 2999,
      img: laptop,
    },
    {
      id: 10,
      nom: "Montre",
      description: "Montre élégante",
      prix: 3999,
      img: montre,
    },
  ];

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">
        Nos produits
      </h2>

      <div className="row g-4">
        {produits.map((produit) => (
          <div className="col-md-6 col-lg-4" key={produit.id}>
            <Card produit={produit} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Produits;