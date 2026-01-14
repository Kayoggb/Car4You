import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import CategoryCard from "../components/ui/CategoryCard";
import "../components/Homepage.css"; // gleicher Style!
import { Link } from "react-router-dom";

export default function CategoriesPage() {
  return (
    <div className="homepage">
      <Sidebar />

      <main className="main">
        <Topbar />

        {/* HERO-ähnlicher Header */}
        <section className="hero">
          <h2>Fahrzeugkategorien</h2>
          <p>Finden Sie das passende Fahrzeug für jede Situation</p>
        </section>

        {/* Kategorien Grid */}
        <section className="section">
          <SectionHeader
            title="Alle Kategorien"
            action={<Link to="/">Filter zurücksetzen</Link>}
          />

          <div className="category-grid">
            <CategoryCard title="Compact" description="Perfekt für die Stadt" />
            <CategoryCard title="SUV" description="Mehr Platz & Komfort" />
            <CategoryCard title="Elektrik" description="Modern & nachhaltig" />
            <CategoryCard title="Luxury" description="Premium Erlebnis" />
            <CategoryCard title="Family" description="Ideal für Reisen" />
            <CategoryCard title="Sport" description="Performance & Style" />
          </div>
        </section>
      </main>
    </div>
  );
}
