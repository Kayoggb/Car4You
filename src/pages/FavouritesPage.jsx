import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import "../components/Homepage.css";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { getAllVehicles } from "../data/vehicles";

export default function FavouritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  // Hole alle Fahrzeuge und filtere nur die Favoriten
  const allVehicles = getAllVehicles();
  const favoriteVehicles = allVehicles.filter(vehicle =>
      favorites.includes(vehicle.slug)
  );

  return (
      <div className="homepage">
        <Sidebar />
        <main className="main">
          <Topbar />

          <section className="hero">
            <h2>Ihre Favoriten</h2>
            <p>
              {favoriteVehicles.length === 0
                  ? "Sie haben noch keine Favoriten markiert"
                  : `${favoriteVehicles.length} Fahrzeug${favoriteVehicles.length !== 1 ? 'e' : ''} gespeichert`
              }
            </p>
          </section>

          <section className="section">
            <SectionHeader
                title="Gespeicherte Fahrzeuge"
                action={<Link to="/categories">Mehr Fahrzeuge entdecken</Link>}
            />

            {favoriteVehicles.length === 0 ? (
                <div style={{
                  textAlign: "center",
                  padding: "3rem",
                  background: "white",
                  borderRadius: 16,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>♥️</div>
                  <h3 style={{ marginBottom: "0.5rem" }}>Noch keine Favoriten</h3>
                  <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                    Klicken Sie auf das Herz-Symbol bei Fahrzeugen, um sie hier zu speichern
                  </p>
                  <Link to="/categories">
                    <button style={{
                      background: "#2563eb",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: 8,
                      border: "none",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}>
                      Fahrzeuge entdecken
                    </button>
                  </Link>
                </div>
            ) : (
                <div className="car-grid">
                  {favoriteVehicles.map((vehicle) => (
                      <div key={vehicle.slug} className="car-card">
                        <div
                            className="car-image"
                            style={{
                              background: `url(${vehicle.image}) center center/cover no-repeat, #e5e7eb`,
                              height: 180,
                              marginBottom: 12,
                              position: "relative"
                            }}
                        >
                          {/* Favorit Button im Bild */}
                          <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(vehicle.slug);
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
                              title="Aus Favoriten entfernen"
                          >
                            ❤️
                          </button>
                        </div>

                        <h4>{vehicle.title}</h4>
                        <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                          {vehicle.transmission} • {vehicle.seats} Sitze
                        </p>
                        <p style={{ fontWeight: 600, color: "#2563eb", marginTop: 8 }}>
                          {vehicle.price} CHF/Tag
                        </p>

                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                          <Link to={`/auto/${vehicle.slug}`} style={{ flex: 1 }}>
                            <button style={{ width: "100%" }}>Details</button>
                          </Link>
                          <button
                              onClick={() => toggleFavorite(vehicle.slug)}
                              style={{
                                padding: "10px 16px",
                                background: "#fee2e2",
                                color: "#dc2626",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontWeight: 500
                              }}
                              title="Entfernen"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </section>
        </main>
      </div>
  );
}