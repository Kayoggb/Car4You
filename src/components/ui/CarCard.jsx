export default function CarCard({ name, price }) {
  return (
    <div className="car-card">
      <div className="car-image" style={{ textAlign: "center", marginBottom: "12px" }}>
        {/* Modernes SVG-Auto-Icon als Platzhalter */}
        <svg
          width="64"
          height="40"
          viewBox="0 0 64 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="18" width="48" height="12" rx="6" fill="#dbeafe" />
          <rect x="16" y="11" width="32" height="14" rx="7" fill="#60a5fa" />
          <circle cx="18" cy="34" r="5" fill="#2563eb" />
          <circle cx="46" cy="34" r="5" fill="#2563eb" />
          <rect x="24" y="16" width="16" height="7" rx="3" fill="#f1f5f9" />
        </svg>
      </div>
      <h4>{name}</h4>
      <p>{price} CHF pro Tag</p>
      <button>Details ansehen</button>
    </div>
  );
}
