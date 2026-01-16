import "./ProfilePage.css";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import HeroBanner from "../components/ui/HeroBanner";
import CTABox from "../components/ui/CTABox";

export default function ProfilePage() {
  return (
    <div className="homepage">
      <Sidebar />

      <main className="main">
        <Topbar />

        <section className="hero">
          <h2>Ihr Profil</h2>
          <p>Eine Übersicht Ihrer persönlichen Daten und Einstellungen</p>
        </section>

        <section className="section">
          <SectionHeader title="Mein Profil" action="Bearbeiten" />
          <div className="car-grid">
            <div className="car-card">
              <div className="car-image" />
              <h4>Max Muster</h4>
              <p><strong>E-Mail:</strong> max.muster@beispiel.ch</p>
              <p><strong>Telefon:</strong> +41 79 123 45 67</p>
              <p><strong>Mitglied seit:</strong> 14.01.2024</p>
              <button>Profil bearbeiten</button>
            </div>
          </div>
        </section>

        <section className="section">
          <SectionHeader title="Meine Einstellungen" action="Alle anzeigen" />
          <div className="category-grid">
            <div className="category-card">
              <div className="category-icon" />
              <div>Benachrichtigungen</div>
              <div>E-Mail, SMS</div>
            </div>
            <div className="category-card">
              <div className="category-icon" />
              <div>Zahlungsmethode</div>
              <div>Kreditkarte: •••• 1234</div>
            </div>
            <div className="category-card">
              <div className="category-icon" />
              <div>Sprache</div>
              <div>Deutsch</div>
            </div>
            <div className="category-card">
              <div className="category-icon" />
              <div>Favoriten</div>
              <div>Tesla Model 3, BMW 3er Touring</div>
            </div>
          </div>
        </section>

        <CTABox />
      </main>
    </div>
  );
}
