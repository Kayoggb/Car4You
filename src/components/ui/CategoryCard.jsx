import { Link } from "react-router-dom";

// type: "category" (für Kategorie-Übersicht) oder "car" (für Fahrzeug/Favoriten)
// slug: für die URL (z.B. "suv", "tesla-model-3")
export default function CategoryCard({ title, description, type, slug }) {
  let targetUrl = "#";
  if (type === "category") targetUrl = `/kategorie/${slug}`;
  if (type === "car") targetUrl = `/auto/${slug}`;

  return (
    <div className="category-card">
      <div className="category-icon" />
      <h4>{title}</h4>
      <p>{description}</p>
      <Link to={targetUrl}>
        <button>Explore</button>
      </Link>
    </div>
  );
}
