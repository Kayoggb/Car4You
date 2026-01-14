import "../components/Homepage.css";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import BookingCard from "../components/ui/BookingCard"; // Nehme an, du hast eine BookingCard Komponente
import HeroBanner from "../components/ui/HeroBanner";
import CTABox from "../components/ui/CTABox";

export default function BookingsPage() {
  return (
    <div className="homepage">
      <Sidebar />

      <main className="main">
        <Topbar />
        <HeroBanner />

        <section className="section">
          <SectionHeader title="Meine Buchungen" action="Alle anzeigen" />
          <div className="car-grid">
            <BookingCard 
              name="BMW 3er Touring"
              date="10.02.2026 – 12.02.2026"
              location="Zürich HB"
              price={180}
              status="Bestätigt"
            />
            <BookingCard 
              name="Tesla Model 3"
              date="15.02.2026 – 18.02.2026"
              location="Basel SBB"
              price={240}
              status="Ausstehend"
            />
            <BookingCard 
              name="VW ID.4"
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
              <div>VW ID.4 • 12.01.2026</div>
            </div>
            <div className="category-card">
              <div className="category-icon" />
              <div>Zahlung abgeschlossen</div>
              <div>Tesla Model 3 • 09.01.2026</div>
            </div>
            <div className="category-card">
              <div className="category-icon" />
              <div>Fahrzeug abgeholt</div>
              <div>BMW 3er Touring • 05.01.2026</div>
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
