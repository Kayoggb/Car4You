import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import CategoryCard from "../components/ui/CategoryCard";
import "../components/Homepage.css";
import { Link } from "react-router-dom";

export default function CategoriesPage() {
  return (
    <div className="homepage">
      <Sidebar />
      <main className="main">
        <Topbar />

        <section className="hero">
          <h2>Fahrzeugkategorien</h2>
          <p>Finden Sie das passende Fahrzeug für jede Situation</p>
        </section>

        <section className="section">
          <SectionHeader
            title="Alle Kategorien"
            action={<Link to="/">Filter zurücksetzen</Link>}
          />

          <div className="category-grid">
            <CategoryCard title="Compact" description="Perfekt für die Stadt" type="category" slug="compact" />
            <CategoryCard title="SUV" description="Mehr Platz & Komfort" type="category" slug="suv" />
            <CategoryCard title="Elektrik" description="Modern & nachhaltig" type="category" slug="elektrik" />
            <CategoryCard title="Luxury" description="Premium Erlebnis" type="category" slug="luxury" />
            <CategoryCard title="Family" description="Ideal für Reisen" type="category" slug="family" />
            <CategoryCard title="Sport" description="Performance & Style" type="category" slug="sport" />
          </div>
        </section>
      </main>
    </div>
  );
}
