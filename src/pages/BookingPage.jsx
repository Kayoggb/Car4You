import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import "../components/Homepage.css";

const MAX_DAYS = 30;
const DAILY_PRICE = 120;

export default function BookingPage() {
    const { slug } = useParams();

    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        name: "",
        email: "",
        phone: ""
    });
    const [bookingDone, setBookingDone] = useState(false);

    // Handler für alle Inputs
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Berechne Miettage
    const getDays = () => {
        if (!formData.startDate || !formData.endDate) return 0;
        const diff = (new Date(formData.endDate) - new Date(formData.startDate)) / (1000*60*60*24);
        return diff > 0 ? diff : 0;
    };

    // Validierung
    const isDateValid =
        formData.startDate &&
        formData.endDate &&
        formData.endDate > formData.startDate &&
        getDays() > 0 &&
        getDays() <= MAX_DAYS;

    const isContactValid =
        formData.name.trim() &&
        formData.email.trim() &&
        formData.phone.trim();

    const isFormValid = isDateValid && isContactValid;

    return (
        <div className="homepage">
            <Sidebar />
            <main className="main">
                <Topbar />

                <section className="hero">
                    <h2>Buchung für: {slug}</h2>
                    <p>Bitte wählen Sie Mietzeitraum und geben Sie Ihre Kontaktdaten ein.</p>
                </section>

                <section className="section" style={{ maxWidth: 580, margin: "0 auto" }}>
                    <SectionHeader
                        title="Buchungsformular"
                        action={
                            bookingDone && (
                                <Link to="/categories">
                                    <button className="secondary-btn">Weitere Fahrzeuge</button>
                                </Link>
                            )
                        }
                    />

                    <div className="car-card" style={{
                        padding: "2.2rem",
                        boxShadow: "0 6px 24px rgba(37,99,235,0.06)",
                        borderRadius: 20,
                        background: "#fff"
                    }}>
                        {!bookingDone ? (
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    setBookingDone(true);
                                }}
                                autoComplete="off"
                            >
                                <h3 style={{ color: "#2563eb", marginBottom: "1rem" }}>Mietdauer & Kontaktdaten</h3>
                                <div style={{
                                    display: "flex",
                                    gap: 18,
                                    alignItems: "flex-end",
                                    marginBottom: 18,
                                    flexWrap: "wrap"
                                }}>
                                    <label style={{ flex: 1, minWidth: 140 }}>
                                        Von
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split("T")[0]}
                                            required
                                            style={{ marginTop: 6, width: "100%", padding: "0.6rem" }}
                                        />
                                    </label>
                                    <label style={{ flex: 1, minWidth: 140 }}>
                                        Bis
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            min={formData.startDate}
                                            required
                                            style={{ marginTop: 6, width: "100%", padding: "0.6rem" }}
                                        />
                                    </label>
                                </div>
                                {formData.startDate && formData.endDate && (
                                    <div style={{ marginBottom: 16 }}>
                                        {isDateValid ? (
                                            <span style={{ color: "#2563eb", fontWeight: 500 }}>
                                                {getDays()} Tag{getDays() > 1 ? "e" : ""}, Gesamtpreis: {getDays() * DAILY_PRICE} CHF
                                            </span>
                                        ) : (
                                            <span style={{ color: "red" }}>
                                                Zeitraum ungültig (min. 1 Tag, max. {MAX_DAYS} Tage).
                                            </span>
                                        )}
                                    </div>
                                )}

                                <label style={{ display: "block", marginBottom: "1rem" }}>
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                        placeholder="Vor- und Nachname"
                                    />
                                </label>
                                <label style={{ display: "block", marginBottom: "1rem" }}>
                                    E-Mail
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                        placeholder="z.B. max.muster@beispiel.ch"
                                    />
                                </label>
                                <label style={{ display: "block", marginBottom: "1.5rem" }}>
                                    Telefon
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                        placeholder="+41 79 123 45 67"
                                    />
                                </label>

                                <div style={{
                                    background: "#eff6ff",
                                    padding: "1rem",
                                    borderRadius: 12,
                                    marginTop: 10,
                                    marginBottom: 18,
                                    textAlign: "center"
                                }}>
                                    <span style={{ fontSize: "1.15rem", color: "#2563eb", fontWeight: 700 }}>
                                        Gesamtpreis:&nbsp;
                                        {isDateValid ? getDays() * DAILY_PRICE : 0} CHF
                                    </span>
                                    <div style={{ color: "#6b7280", fontSize: "0.93rem", marginTop: 4 }}>
                                        ({DAILY_PRICE} CHF/Tag, inkl. Versicherung & Steuern)
                                    </div>
                                </div>
                                <button
                                    className="primary-btn"
                                    type="submit"
                                    style={{ width: "100%" }}
                                    disabled={!isFormValid}
                                >
                                    Buchung abschließen
                                </button>
                            </form>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <h3 style={{ color: "#2563eb", marginBottom: "1rem" }}>Vielen Dank für Ihre Buchung!</h3>
                                <p>Sie erhalten in Kürze eine Bestätigung per E-Mail.</p>
                                <Link to="/bookings">
                                    <button className="primary-btn" style={{ marginTop: 18 }}>
                                        Zu meinen Buchungen
                                    </button>
                                </Link>
                                <Link to="/categories">
                                    <button className="secondary-btn" style={{ marginTop: 12, marginLeft: 10 }}>
                                        Weitere Fahrzeuge ansehen
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}