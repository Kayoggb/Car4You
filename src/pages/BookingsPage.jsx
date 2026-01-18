import "../components/Homepage.css";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import BookingCard from "../components/ui/BookingCard";
import HeroBanner from "../components/ui/HeroBanner";
import CTABox from "../components/ui/CTABox";
import { vehicles } from "../data/vehicles";

const allAutos = [
  vehicles.family.find(car => car.slug === "skoda-octavia"),
  vehicles.elektrik.find(car => car.slug === "tesla-model-3"),
  vehicles.suv.find(car => car.slug === "vw-tiguan")
];

export default function BookingsPage() {
  return (
    <div className="homepage">
      <Sidebar />

      <main className="main">
        <Topbar />

        <section className="hero">
          <h2>Ihre Buchungen</h2>
          <p>Eine Übersicht Ihrer aktuellen Buchungen</p>
        </section>

        <section className="section">
          <SectionHeader title="Meine Buchungen" action="Alle anzeigen" />
          <div className="car-grid">
            <BookingCard 
              name={allAutos[0].title}
              date="10.02.2026 – 12.02.2026"
              location="Zürich HB"
              price={180}
              status="Bestätigt"
            />
            <BookingCard 
              name={allAutos[1].title}
              date="15.02.2026 – 18.02.2026"
              location="Basel SBB"
              price={240}
              status="Ausstehend"
            />
            <BookingCard 
              name={allAutos[2].title}
              date="22.02.2026 – 24.02.2026"
              location="Bern"
              price={150}
              status="Storniert"
            />
          </div>
        </section>

        <section className="section">
          <SectionHeader title="Letzte Aktionen" action="Aktivitäten anzeigen" />
          <div className="category-grid">
            {/* Dummy-Items für Aktivitäten/Aktionen */}
            <div className="category-card">
              <div className="category-icon" />
              <div>Buchung storniert</div>
              <div>VW Tiguan • 12.01.2026</div>
            </div>
            <div className="category-card">
              <div className="category-icon" />
              <div>Zahlung abgeschlossen</div>
              <div>Tesla Model 3 • 09.01.2026</div>
            </div>
            <div className="category-card">
              <div className="category-icon" />
              <div>Fahrzeug abgeholt</div>
              <div>Skoda Octavia • 05.01.2026</div>
            </div>
            <div className="category-card">
              <div className="category-icon" />
              <div>Buchung bestätigt</div>
              <div>Tesla Model 3 • 01.01.2026</div>
            </div>
          </div>
        </section>

        <CTABox />
      </main>
    </div>
  );
}
