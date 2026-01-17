import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import "../components/Homepage.css";
import { vehicles, getCategoryBySlug } from "../data/vehicles";
import { useFavorites } from "../context/FavoritesContext";

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const autos = vehicles[slug] || [];
  const category = getCategoryBySlug(slug);
  const prettyTitle = category ? category.title : slug;
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
      <div className="homepage">
        <Sidebar />
        <main className="main">
          <Topbar />
          <section className="hero">
            <h2>{prettyTitle}</h2>
            <p>{category?.description || "Alle Fahrzeuge dieser Kategorie"}</p>
          </section>
          <section className="section">
            <SectionHeader
                title={`${autos.length} Fahrzeuge`}
                action={<Link to="/categories">Zurück</Link>}
            />
            <div className="car-grid">
              {autos.length === 0 && (
                  <div>Keine Fahrzeuge verfügbar.</div>
              )}
              {autos.map((auto) => (
                  <div key={auto.slug} className="car-card">
                    <div
                        className="car-image"
                        style={{
                          background: `url(${auto.image}) center center/cover no-repeat, #e5e7eb`,
                          height: 180,
                          marginBottom: 12,
                          position: "relative"
                        }}
                    >
                      {/* Favorit Button */}
                      <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(auto.slug);
                          }}
                          style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: 40,
                            height: 40,
                            cursor: "pointer",
                            fontSize: "1.2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                          }}
                          title={isFavorite(auto.slug) ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
                      >
                        {isFavorite(auto.slug) ? "❤️" : "🤍"}
                      </button>
                    </div>
                    <h4>{auto.title}</h4>
                    <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                      {auto.transmission} • {auto.seats} Sitze
                    </p>
                    <p style={{ fontWeight: 600, color: "#2563eb", marginTop: 8 }}>
                      {auto.price} CHF/Tag
                    </p>
                    <Link to={`/auto/${auto.slug}`}>
                      <button style={{ marginTop: 12, width: "100%" }}>Details</button>
                    </Link>
                  </div>
              ))}
            </div>
          </section>
        </main>
      </div>
  );
}