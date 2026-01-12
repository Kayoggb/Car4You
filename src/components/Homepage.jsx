import "./Homepage.css";

import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

import SectionHeader from "./ui/SectionHeader";
import CategoryCard from "./ui/CategoryCard";
import CarCard from "./ui/CarCard";
import HeroBanner from "./ui/HeroBanner";
import CTABox from "./ui/CTABox";

export default function Homepage() {
  return (
    <div className="homepage">
      <Sidebar />

      <main className="main">
        <Topbar />
        <HeroBanner />

        <section className="section">
          <SectionHeader title="Fahrzeugkategorien" action="Alle ansehen" />
          <div className="category-grid">
            <CategoryCard title="Compact" description="Klein & effizient" />
            <CategoryCard title="Elektrik" description="Nachhaltig & modern" />
            <CategoryCard title="SUV" description="Viel Platz & Komfort" />
            <CategoryCard title="Luxury" description="Premium Fahrzeuge" />
          </div>
        </section>

        <section className="section">
          <SectionHeader title="Recently Viewed" action="Alle ansehen" />
          <div className="car-grid">
            <CarCard name="Jaguar I-Pace" price={100} />
            <CarCard name="Jaguar I-Pace" price={100} />
            <CarCard name="Jaguar I-Pace" price={100} />
          </div>
        </section>

        <CTABox />
      </main>
    </div>
  );
}
