import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import CategoryCard from "../components/ui/CategoryCard";
import "../components/Homepage.css";
import { Link } from "react-router-dom";

export default function FavouritesPage() {
  // Beispielhafte Favoriten mit Slug für die URL
  const favourites = [
    { title: "Tesla Model 3", description: "Elektrisch & modern", slug: "tesla-model-3" },
    { title: "BMW X5", description: "SUV mit Luxus", slug: "bmw-x5" },
    { title: "Mini Cooper", description: "Kompakt & stylisch", slug: "mini-cooper" },
    { title: "Mercedes S-Klasse", description: "Premium-Luxus", slug: "mercedes-s-klasse" },
    { title: "VW ID.4", description: "Nachhaltig & geräumig", slug: "vw-id-4" },
    { title: "Porsche 911", description: "Sport & Performance", slug: "porsche-911" },
  ];

  return (
    <div className="homepage">
      <Sidebar />
      <main className="main">
        <Topbar />

        <section className="hero">
          <h2>Ihre Favoriten</h2>
          <p>Eine Übersicht Ihrer markierten Lieblingsfahrzeuge</p>
        </section>

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
                type="car"
                slug={fav.slug}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
