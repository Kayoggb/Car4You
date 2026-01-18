import "./Homepage.css";

import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

import SectionHeader from "./ui/SectionHeader";
import CategoryCard from "./ui/CategoryCard";
import CarCard from "./ui/CarCard";
import HeroBanner from "./ui/HeroBanner";
import CTABox from "./ui/CTABox";
import { Link } from "react-router-dom";

import { vehicles } from "../data/vehicles"; // Pfad ggf. anpassen

// Beispielhafte Auswahl von "echten" Autos
const recentlyViewed = [
  vehicles.compact[0], // Fiat 500
  vehicles.suv[0],     // VW Tiguan
  vehicles.elektrik[0] // Tesla Model 3
];

export default function Homepage() {
  return (
    <div className="homepage">
      <Sidebar />

      <main className="main">
        <Topbar />
        <HeroBanner />

        <section className="section">
          <SectionHeader
            title="Fahrzeugkategorien"
            action={<Link to="/categories">Alle ansehen</Link>}
          />
          <div className="category-grid">
            <CategoryCard title="Compact" description="Perfekt für die Stadt" type="category" slug="compact" />
            <CategoryCard title="SUV" description="Mehr Platz & Komfort" type="category" slug="suv" />
            <CategoryCard title="Elektrik" description="Modern & nachhaltig" type="category" slug="elektrik" />
            <CategoryCard title="Luxury" description="Premium Erlebnis" type="category" slug="luxury" />
          </div>
        </section>

        <section className="section">
          <SectionHeader title="Recently Viewed" action="Alle ansehen" />
          <div className="car-grid">
            {recentlyViewed.map(car => (
              <CarCard name={car.title} price={car.price} slug={car.slug} image={car.image} />
            ))}
          </div>
        </section>

        <CTABox />
      </main>
    </div>
  );
}
