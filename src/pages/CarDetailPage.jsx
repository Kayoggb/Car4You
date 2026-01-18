import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import "../components/Homepage.css";
import { getVehicleBySlug } from "../data/vehicles";
import { useFavorites } from "../context/FavoritesContext";

export default function CarDetailPage() {
    const { slug } = useParams();
    const car = getVehicleBySlug(slug);
    const { isFavorite, toggleFavorite } = useFavorites();

    if (!car) {
        return (
            <div className="homepage">
                <Sidebar />
                <main className="main">
                    <Topbar />
                    <div style={{ textAlign: "center", padding: "3rem" }}>
                        <h2>Fahrzeug nicht gefunden</h2>
                        <Link to="/categories">
                            <button style={{ marginTop: "1rem" }}>Zurück zu den Kategorien</button>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const isCarFavorite = isFavorite(car.slug);

    return (
        <div className="homepage">
            <Sidebar />
            <main className="main">
                <Topbar />

                <section className="hero">
                    <h2>{car.title}</h2>
                    <p>{car.category}</p>
                </section>

                <section className="section">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "2rem",
                    }}>
                        {/* Fahrzeugbild */}
                        <div>
                            <div
                                className="car-image"
                                style={{
                                    background: `url(${car.image}) center center/cover no-repeat, #e5e7eb`,
                                    height: 400,
                                    borderRadius: 16,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    position: "relative"
                                }}
                            >
                                {/* Favorit Button */}
                                <button
                                    onClick={() => toggleFavorite(car.slug)}
                                    style={{
                                        position: "absolute",
                                        top: 20,
                                        right: 20,
                                        background: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: 50,
                                        height: 50,
                                        cursor: "pointer",
                                        fontSize: "1.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                                        transition: "transform 0.2s"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    title={isCarFavorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
                                >
                                    {isCarFavorite ? "❤️" : "🤍"}
                                </button>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="car-card">
                            <h3 style={{ marginBottom: 24, fontSize: "1.5rem" }}>Details</h3>

                            {/* Preis-Box */}
                            <div style={{
                                background: "#eff6ff",
                                padding: "1.5rem",
                                borderRadius: 12,
                                marginBottom: 24,
                                textAlign: "center"
                            }}>
                                <div style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: 8 }}>
                                    Mietpreis
                                </div>
                                <div style={{ fontSize: "2rem", fontWeight: 700, color: "#2563eb" }}>
                                    {car.price} CHF
                                </div>
                                <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                                    pro Tag
                                </div>
                            </div>

                            {/* Basis-Info */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ display: "grid", gap: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
                                        <span style={{ color: "#6b7280" }}>Kategorie</span>
                                        <span style={{ fontWeight: 500 }}>{car.category}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
                                        <span style={{ color: "#6b7280" }}>Getriebe</span>
                                        <span style={{ fontWeight: 500 }}>{car.transmission}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                                        <span style={{ color: "#6b7280" }}>Sitzplätze</span>
                                        <span style={{ fontWeight: 500 }}>{car.seats}</span>
                                    </div>
                                </div>
                            </div>

                            <Link to={`/buchung/${car.slug}`}>
                                <button
                                    style={{
                                        width: "100%",
                                        background: "#2563eb",
                                        color: "white",
                                        padding: "12px",
                                        borderRadius: 8,
                                        border: "none",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        marginBottom: 12
                                    }}
                                >
                                    Jetzt buchen
                                </button>
                            </Link>


                            <button
                                onClick={() => toggleFavorite(car.slug)}
                                style={{
                                    width: "100%",
                                    background: isCarFavorite ? "#fee2e2" : "#f3f4f6",
                                    color: isCarFavorite ? "#dc2626" : "#374151",
                                    padding: "12px",
                                    borderRadius: 8,
                                    border: "none",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    marginBottom: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 8
                                }}
                            >
                                {isCarFavorite ? "❤️ Aus Favoriten entfernen" : "🤍 Zu Favoriten hinzufügen"}
                            </button>

                            <Link to="/categories">
                                <button style={{
                                    width: "100%",
                                    background: "white",
                                    color: "#374151",
                                    border: "1px solid #e5e7eb"
                                }}>
                                    ← Zurück
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}