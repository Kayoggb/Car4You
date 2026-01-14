export default function BookingCard({ name, date, location, price, status }) {
  return (
    <div className="car-card">
      <div className="car-image" />
      <h4>{name}</h4>
      <p><strong>Buchungszeitraum:</strong> {date}</p>
      <p><strong>Abholort:</strong> {location}</p>
      <p><strong>Preis:</strong> {price} CHF gesamt</p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              status === "Bestätigt"
                ? "#22c55e"
                : status === "Ausstehend"
                ? "#eab308"
                : "#ef4444",
            fontWeight: 500,
          }}
        >
          {status}
        </span>
      </p>
      <button>Details ansehen</button>
    </div>
  );
}
