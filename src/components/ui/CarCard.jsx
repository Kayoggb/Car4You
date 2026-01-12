export default function CarCard({ name, price }) {
  return (
    <div className="car-card">
      <div className="car-image" />
      <h4>{name}</h4>
      <p>{price} CHF pro Tag</p>
      <button>View Details</button>
    </div>
  );
}
