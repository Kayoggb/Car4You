import { Link } from "react-router-dom";

export default function CarCard({ name, price, slug, image }) {
  return (
    <div className="car-card">
      <div className="car-image" style={{ textAlign: "center", marginBottom: "12px" }}>
        {/* Fahrzeugbild statt SVG */}
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            maxWidth: "180px",
            maxHeight: "110px",
            objectFit: "cover",
            borderRadius: "12px",
            background: "#f3f4f6"
          }}
        />
      </div>
      <h4>{name}</h4>
      <p>{price} CHF pro Tag</p>
      <Link to={`/auto/${slug}`}>
        <button>Details ansehen</button>
      </Link>
    </div>
  );
}
