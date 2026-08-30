import "./card.css";

function Card({ name, job }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{job}</p>
      <button>Profile</button>
    </div>
  );
}

export default Card;