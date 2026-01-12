export default function CategoryCard({ title, description }) {
  return (
    <div className="category-card">
      <div className="category-icon" />
      <h4>{title}</h4>
      <p>{description}</p>
      <button>Explore</button>
    </div>
  );
}
