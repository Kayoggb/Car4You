import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import "../components/Homepage.css";
import { vehicles, getCategoryBySlug } from "../data/vehicles";
import { useFavorites } from "../context/FavoritesContext";

const gearboxOptions = [
  { value: "", label: "Alle Getriebe" },
  { value: "Automatik", label: "Automatik" },
  { value: "Manuell", label: "Manuell" },
];

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const autos = vehicles[slug] || [];
  const category = getCategoryBySlug(slug);
  const prettyTitle = category ? category.title : slug;
  const { isFavorite, toggleFavorite } = useFavorites();

  // --- Filter-State ---
  const minPriceDefault = autos.length ? Math.min(...autos.map(a => a.price)) : 0;
  const maxPriceDefault = autos.length ? Math.max(...autos.map(a => a.price)) : 500;
  const minSeatsDefault = autos.length ? Math.min(...autos.map(a => a.seats)) : 2;
  const maxSeatsDefault = autos.length ? Math.max(...autos.map(a => a.seats)) : 7;

  const [filter, setFilter] = useState({
    minPrice: minPriceDefault,
    maxPrice: maxPriceDefault,
    gearbox: "",
    minSeats: minSeatsDefault,
    maxSeats: maxSeatsDefault,
  });

  const [filterOpen, setFilterOpen] = useState(false);

  // --- Filtering ---
  const filteredAutos = useMemo(() => {
    return autos.filter((auto) =>
      auto.price >= filter.minPrice &&
      auto.price <= filter.maxPrice &&
      auto.seats >= filter.minSeats &&
      auto.seats <= filter.maxSeats &&
      (filter.gearbox === "" || auto.transmission === filter.gearbox)
    );
  }, [autos, filter]);

  // --- UI ---
  return (
    <div className="homepage">
      <Sidebar />
      <main className="main">
        <Topbar />
        <section className="hero">
          <h2>{prettyTitle}</h2>
          <p>{category?.description || "Alle Fahrzeuge dieser Kategorie"}</p>
        </section>

        {/* --- Filter Menü als Dropdown --- */}
        <section className="section" style={{ marginBottom: 12 }}>
          <div style={{ marginBottom: 0 }}>
            <button
              type="button"
              onClick={() => setFilterOpen(f => !f)}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: 7,
                fontWeight: 600,
                padding: "0.6rem 1.3rem",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(37,99,235,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: filterOpen ? 12 : 0
              }}
              aria-expanded={filterOpen}
              aria-controls="filter-panel"
            >
              {filterOpen ? "Filter ausblenden" : "Filter anzeigen"}
              <span style={{
                fontSize: "1.2rem",
                transform: `rotate(${filterOpen ? 180 : 0}deg)`,
                display: "inline-block",
                transition: "transform 0.2s"
              }}>▼</span>
            </button>
            <div
              id="filter-panel"
              style={{
                maxHeight: filterOpen ? 500 : 0,
                opacity: filterOpen ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.2s",
                background: "#f1f5f9",
                borderRadius: 14,
                boxShadow: "0 2px 10px rgba(37,99,235,0.07)",
                padding: filterOpen ? "1.4rem 2rem" : "0 2rem",
                marginTop: filterOpen ? 6 : 0,
                marginBottom: filterOpen ? 12 : 0
              }}
            >
              {filterOpen && (
                <div
                  className="car-filterbar"
                  style={{
                    display: "flex",
                    gap: "3rem",
                    alignItems: "center",
                    flexWrap: "wrap"
                  }}
                >
                  {/* Preis-Filter */}
                  <div style={{ minWidth: 160 }}>
                    <label style={{ fontWeight: 500, color: "#2563eb" }}>Preis (CHF/Tag)</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="range"
                        min={minPriceDefault}
                        max={maxPriceDefault}
                        value={filter.minPrice}
                        onChange={e => setFilter(f => ({ ...f, minPrice: Number(e.target.value) }))}
                        style={{ flex: 1 }}
                      />
                      <span style={{ minWidth: 28 }}>{filter.minPrice}</span>
                      <span style={{ color: "#6b7280" }}>–</span>
                      <input
                        type="range"
                        min={minPriceDefault}
                        max={maxPriceDefault}
                        value={filter.maxPrice}
                        onChange={e => setFilter(f => ({ ...f, maxPrice: Number(e.target.value) }))}
                        style={{ flex: 1 }}
                      />
                      <span style={{ minWidth: 28 }}>{filter.maxPrice}</span>
                    </div>
                  </div>
                  {/* Getriebe-Filter */}
                  <div>
                    <label style={{ fontWeight: 500, color: "#2563eb" }}>Getriebe</label>
                    <select
                      value={filter.gearbox}
                      onChange={e => setFilter(f => ({ ...f, gearbox: e.target.value }))}
                      style={{
                        marginLeft: 12,
                        borderRadius: 8,
                        border: "1px solid #cbd5e1",
                        padding: "0.45rem",
                        minWidth: 110
                      }}
                    >
                      {gearboxOptions.map(opt =>
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      )}
                    </select>
                  </div>
                  {/* Sitzplätze-Filter */}
                  <div style={{ minWidth: 140 }}>
                    <label style={{ fontWeight: 500, color: "#2563eb" }}>Sitzplätze</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="range"
                        min={minSeatsDefault}
                        max={maxSeatsDefault}
                        value={filter.minSeats}
                        onChange={e => setFilter(f => ({ ...f, minSeats: Number(e.target.value) }))}
                        style={{ flex: 1 }}
                      />
                      <span style={{ minWidth: 26 }}>{filter.minSeats}</span>
                      <span style={{ color: "#6b7280" }}>–</span>
                      <input
                        type="range"
                        min={minSeatsDefault}
                        max={maxSeatsDefault}
                        value={filter.maxSeats}
                        onChange={e => setFilter(f => ({ ...f, maxSeats: Number(e.target.value) }))}
                        style={{ flex: 1 }}
                      />
                      <span style={{ minWidth: 26 }}>{filter.maxSeats}</span>
                    </div>
                  </div>
                  {/* Reset-Button */}
                  <button
                    style={{
                      background: "#e0e7ff",
                      color: "#2563eb",
                      border: "none",
                      borderRadius: 7,
                      fontWeight: 600,
                      padding: "0.5rem 1.2rem",
                      marginLeft: 14,
                      cursor: "pointer",
                      boxShadow: "0 2px 10px rgba(37,99,235,0.07)"
                    }}
                    onClick={() => setFilter({
                      minPrice: minPriceDefault,
                      maxPrice: maxPriceDefault,
                      gearbox: "",
                      minSeats: minSeatsDefault,
                      maxSeats: maxSeatsDefault,
                    })}
                  >
                    Filter zurücksetzen
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- Fahrzeuge --- */}
        <section className="section">
          <SectionHeader
            title={`${filteredAutos.length} Fahrzeuge`}
            action={<Link to="/categories">Zurück</Link>}
          />
          <div className="car-grid">
            {filteredAutos.length === 0 && (
              <div>Keine Fahrzeuge entsprechen dem Filter.</div>
            )}
            {filteredAutos.map((auto) => (
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
