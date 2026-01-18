import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import CTABox from "../components/ui/CTABox";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [showFullProfile, setShowFullProfile] = useState(false);

  // Beispiel-Daten
  const profile = {
    name: "Max Muster",
    email: "max.muster@beispiel.ch",
    phone: "+41 79 123 45 67",
    memberSince: "14.01.2024",
    notifications: "E-Mail, SMS",
    payment: "Kreditkarte: •••• 1234",
    language: "Deutsch",
    address: "Bahnhofstrasse 1, 8001 Zürich"
  };

  // Umschalten
  const handleShowProfile = () => setShowFullProfile(true);
  const handleHideProfile = () => setShowFullProfile(false);

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
          <SectionHeader title="Mein Profil" action={!showFullProfile && "Ganzes Profil ansehen"} />
          <div className="car-grid">
            {!showFullProfile ? (
              <div className="car-card">
                <div className="car-image" />
                <h4>{profile.name}</h4>
                <p><strong>E-Mail:</strong> {profile.email}</p>
                <p><strong>Telefon:</strong> {profile.phone}</p>
                <p><strong>Mitglied seit:</strong> {profile.memberSince}</p>
                <button onClick={handleShowProfile}>Ganzes Profil ansehen</button>
              </div>
            ) : (
              <div className="car-card">
                <div className="car-image" />
                <h4>{profile.name}</h4>
                <p><strong>E-Mail:</strong> {profile.email}</p>
                <p><strong>Telefon:</strong> {profile.phone}</p>
                <p><strong>Mitglied seit:</strong> {profile.memberSince}</p>
                <p><strong>Adresse:</strong> {profile.address}</p>
                <hr style={{ margin: "1rem 0" }} />
                <p><strong>Benachrichtigungen:</strong> {profile.notifications}</p>
                <p><strong>Zahlungsmethode:</strong> {profile.payment}</p>
                <p><strong>Sprache:</strong> {profile.language}</p>
                <p><strong>Adresse:</strong> {profile.address}</p>
                <button onClick={handleHideProfile}>Zurück</button>
              </div>
            )}
          </div>
        </section>

        {!showFullProfile && (
          <section className="section">
            <SectionHeader title="Meine Einstellungen" action=" " />
            <div className="category-grid">
              <div className="category-card">
                <div className="category-icon" />
                <div>Benachrichtigungen</div>
                <div>{profile.notifications}</div>
              </div>
              <div className="category-card">
                <div className="category-icon" />
                <div>Zahlungsmethode</div>
                <div>{profile.payment}</div>
              </div>
              <div className="category-card">
                <div className="category-icon" />
                <div>Sprache</div>
                <div>{profile.language}</div>
              </div>
              <div className="category-card">
                <div className="category-icon" />
                <div>Adresse</div>
                <div>{profile.address}</div>
              </div>
            </div>
          </section>
        )}

        <CTABox />
      </main>
    </div>
  );
}
