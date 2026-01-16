import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import CategoryCard from "../components/ui/CategoryCard"; // gleiche Karte wie für Kategorien
import "../components/Homepage.css"; // gleicher Style
import { Link } from "react-router-dom";

export default function FavouritesPage() {
  // Beispielhafte Favoriten
  const favourites = [
    { title: "Tesla Model 3", description: "Elektrisch & modern" },
    { title: "BMW X5", description: "SUV mit Luxus" },
    { title: "Mini Cooper", description: "Kompakt & stylisch" },
    { title: "Mercedes S-Klasse", description: "Premium-Luxus" },
    { title: "VW ID.4", description: "Nachhaltig & geräumig" },
    { title: "Porsche 911", description: "Sport & Performance" },
  ];

  return (
    <div className="homepage">
      <Sidebar />

      <main className="main">
        <Topbar />

        {/* HERO-ähnlicher Header */}
        <section className="hero">
          <h2>Ihre Favoriten</h2>
          <p>Eine Übersicht Ihrer markierten Lieblingsfahrzeuge</p>
        </section>

        {/* Favoriten Grid */}
        <section className="section">
          <SectionHeader
            title="Alle Favoriten"
            action={<Link to="/">Filter zurücksetzen</Link>}
          />

          <div className="category-grid">
            {favourites.map((fav) => (
              <CategoryCard
                key={fav.title}
                title={fav.title}
                description={fav.description}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
