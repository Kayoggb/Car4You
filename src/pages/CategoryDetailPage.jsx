import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import "../components/Homepage.css";

// Dummy-Daten
const autosByCategory = {
  compact: [
    { title: "Mini Cooper", description: "Kompakt & stylisch", slug: "mini-cooper" },
    { title: "VW Polo", description: "Zuverlässig & wendig", slug: "vw-polo" },
  ],
  suv: [
    { title: "BMW X5", description: "SUV mit Luxus", slug: "bmw-x5" },
    { title: "Audi Q7", description: "Komfortabel & groß", slug: "audi-q7" },
  ],
  elektrk: [
    { title: "Tesla Model 3", description: "Elektrisch & modern", slug: "tesla-model-3" },
    { title: "VW ID.4", description: "Nachhaltig & geräumig", slug: "vw-id-4" },
  ],
  luxury: [
    { title: "Mercedes S-Klasse", description: "Premium-Luxus", slug: "mercedes-s-klasse" },
    { title: "BMW 7er", description: "Exklusiv & komfortabel", slug: "bmw-7er" },
  ],
  family: [
    { title: "VW Touran", description: "Familienfreundlich & sicher", slug: "vw-touran" },
    { title: "Ford Galaxy", description: "Viel Platz für alle", slug: "ford-galaxy" },
  ],
  sport: [
    { title: "Porsche 911", description: "Sport & Performance", slug: "porsche-911" },
    { title: "Audi TT", description: "Stylisch & schnell", slug: "audi-tt" },
  ],
};

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const autos = autosByCategory[slug] || [];
  const prettyTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "";

  return (
    <div className="homepage">
      <Sidebar />
      <main className="main">
        <Topbar />
        <section className="hero">
          <h2>Kategorie: {prettyTitle}</h2>
          <p>Alle Fahrzeuge dieser Kategorie</p>
        </section>
        <section className="section">
          <SectionHeader
            title="Fahrzeuge"
            action={<Link to="/categories">Zurück zu den Kategorien</Link>}
          />
          <div className="car-grid">
            {autos.length === 0 && (
              <div>In dieser Kategorie sind derzeit keine Fahrzeuge verfügbar.</div>
            )}
            {autos.map((auto) => (
              <div key={auto.slug} className="car-card">
                <div className="car-image" />
                <h4>{auto.title}</h4>
                <p>{auto.description}</p>
                <Link to={`/auto/${auto.slug}`}>
                  <button>Details</button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
