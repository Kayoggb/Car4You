import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SectionHeader from "../components/ui/SectionHeader";
import "../components/Homepage.css";
import { getVehicleBySlug } from "../data/vehicles";

const MAX_DAYS = 30;

export default function BookingPage() {
    const { slug } = useParams();
    const car = getVehicleBySlug(slug);

    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        name: "",
        email: "",
        phone: "",
        street: "",
        zip: "",
        city: "",
        country: "",
        pickupLocation: "", // <-- NEU
        cardNumber: "",
        cardExpiry: "",
        cardCVC: ""
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
        const diff = (new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24);
        return diff > 0 ? diff : 0;
    };

    // Validierungen (direkt und immer)
    const isStartDateValid = !!formData.startDate;
    const isEndDateValid = !!formData.endDate && formData.endDate > formData.startDate;
    const isDateRangeValid = isStartDateValid && isEndDateValid && getDays() > 0 && getDays() <= MAX_DAYS;

    const isNameValid = formData.name.trim().length > 0;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const isPhoneValid = /^(\+41|0)[0-9 ]{9,}$/.test(formData.phone.trim());

    const isStreetValid = formData.street.trim().length > 0;
    const isZipValid = /^[0-9]{4,5}$/.test(formData.zip.trim());
    const isCityValid = formData.city.trim().length > 0;
    const isCountryValid = formData.country.trim().length > 0;
    const isPickupLocationValid = formData.pickupLocation.trim().length > 0; // <-- NEU

    const isCardNumberValid = /^[0-9]{16}$/.test(formData.cardNumber.replace(/ /g, ""));
    const isCardExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry.trim());
    const isCardCVCValid = /^[0-9]{3}$/.test(formData.cardCVC.trim());

    const isFormValid =
        isDateRangeValid &&
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isStreetValid &&
        isZipValid &&
        isCityValid &&
        isCountryValid &&
        isPickupLocationValid && // <-- NEU
        isCardNumberValid &&
        isCardExpiryValid &&
        isCardCVCValid;

    // Fahrzeug nicht gefunden
    if (!car) {
        return (
            <div className="homepage">
                <Sidebar />
                <main className="main">
                    <Topbar />
                    <div style={{ textAlign: "center", padding: "3rem" }}>
                        <h2>Fahrzeug nicht gefunden</h2>
                        <Link to="/categories">
                            <button style={{ marginTop: "1rem" }}>Zurück zu den Kategorien</button>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const DAILY_PRICE = car.price;

    return (
        <div className="homepage">
            <Sidebar />
            <main className="main">
                <Topbar />

                <section className="hero">
                    <h2>Buchung für: {car.title}</h2>
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
                                        {!isStartDateValid && (
                                            <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                                Bitte wählen Sie einen Starttag.
                                            </div>
                                        )}
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
                                        {(!formData.endDate || !isEndDateValid) && (
                                            <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                                Bitte wählen Sie ein gültiges Enddatum.
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {(!isDateRangeValid && isStartDateValid && isEndDateValid) && (
                                    <div style={{ color: "red", marginBottom: 12 }}>
                                        Zeitraum ungültig (min. 1 Tag, max. {MAX_DAYS} Tage).
                                    </div>
                                )}
                                {(formData.startDate && formData.endDate && isDateRangeValid) && (
                                    <div style={{ marginBottom: 16, color: "#2563eb", fontWeight: 500 }}>
                                        {getDays()} Tag{getDays() > 1 ? "e" : ""}, Gesamtpreis: {getDays() * DAILY_PRICE} CHF
                                    </div>
                                )}

                                {/* Kontakt */}
                                <h4 style={{ color: "#2563eb", margin: "18px 0 12px" }}>Kontaktdaten</h4>
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
                                    {!isNameValid && (
                                        <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                            Bitte geben Sie Ihren Namen ein.
                                        </div>
                                    )}
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
                                    {!isEmailValid && (
                                        <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                            Bitte eine gültige E-Mail-Adresse eingeben.
                                        </div>
                                    )}
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
                                    {!isPhoneValid && (
                                        <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                            Bitte geben Sie eine gültige Schweizer Telefonnummer ein.
                                        </div>
                                    )}
                                </label>

                                {/* Abholort */}
                                <label style={{ display: "block", marginBottom: "1.5rem" }}>
                                    Abholort
                                    <input
                                        type="text"
                                        name="pickupLocation"
                                        value={formData.pickupLocation}
                                        onChange={handleChange}
                                        required
                                        style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                        placeholder="z.B. Zürich HB"
                                    />
                                    {!isPickupLocationValid && (
                                        <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                            Bitte geben Sie einen Abholort an.
                                        </div>
                                    )}
                                </label>

                                {/* Adresse */}
                                <h4 style={{ color: "#2563eb", margin: "18px 0 12px" }}>Adresse</h4>
                                <label style={{ display: "block", marginBottom: "1rem" }}>
                                    Straße und Hausnummer
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        required
                                        style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                        placeholder="Musterstrasse 1"
                                    />
                                    {!isStreetValid && (
                                        <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                            Bitte geben Sie Ihre Straße ein.
                                        </div>
                                    )}
                                </label>
                                <label style={{ display: "block", marginBottom: "1rem" }}>
                                    PLZ
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        required
                                        style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                        placeholder="8000"
                                    />
                                    {!isZipValid && (
                                        <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                            Bitte geben Sie eine gültige Postleitzahl ein.
                                        </div>
                                    )}
                                </label>
                                <label style={{ display: "block", marginBottom: "1rem" }}>
                                    Stadt
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                        placeholder="Zürich"
                                    />
                                    {!isCityValid && (
                                        <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                            Bitte geben Sie Ihre Stadt ein.
                                        </div>
                                    )}
                                </label>
                                <label style={{ display: "block", marginBottom: "1rem" }}>
                                    Land
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                        placeholder="Schweiz"
                                    />
                                    {!isCountryValid && (
                                        <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                            Bitte geben Sie Ihr Land ein.
                                        </div>
                                    )}
                                </label>

                                {/* Kreditkarte */}
                                <h4 style={{ color: "#2563eb", margin: "18px 0 12px" }}>Kreditkarte</h4>
                                <div style={{
                                    background: "#f9fafb",
                                    borderRadius: 12,
                                    padding: "1rem",
                                    marginBottom: "1rem",
                                    boxShadow: "0 2px 8px rgba(37,99,235,0.06)"
                                }}>
                                    <label style={{ display: "block", marginBottom: "1rem" }}>
                                        Kartennummer
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            required
                                            maxLength={19}
                                            style={{ marginLeft: 12, width: "100%", padding: "0.6rem" }}
                                            placeholder="1234 5678 9012 3456"
                                        />
                                        {!isCardNumberValid && (
                                            <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                                Bitte geben Sie eine gültige 16-stellige Kartennummer ein.
                                            </div>
                                        )}
                                    </label>
                                    <label style={{ display: "inline-block", marginRight: "1rem", marginBottom: "1rem" }}>
                                        Ablaufdatum (MM/YY)
                                        <input
                                            type="text"
                                            name="cardExpiry"
                                            value={formData.cardExpiry}
                                            onChange={handleChange}
                                            required
                                            maxLength={5}
                                            style={{ marginLeft: 12, width: 120, padding: "0.6rem" }}
                                            placeholder="08/26"
                                        />
                                        {!isCardExpiryValid && (
                                            <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                                Bitte geben Sie ein gültiges Datum im Format MM/YY ein.
                                            </div>
                                        )}
                                    </label>
                                    <label style={{ display: "inline-block", marginBottom: "1rem" }}>
                                        CVC
                                        <input
                                            type="text"
                                            name="cardCVC"
                                            value={formData.cardCVC}
                                            onChange={handleChange}
                                            required
                                            maxLength={3}
                                            style={{ marginLeft: 12, width: 80, padding: "0.6rem" }}
                                            placeholder="123"
                                        />
                                        {!isCardCVCValid && (
                                            <div style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
                                                Bitte geben Sie einen gültigen 3-stelligen CVC ein.
                                            </div>
                                        )}
                                    </label>
                                </div>

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
                                        {isDateRangeValid ? getDays() * DAILY_PRICE : 0} CHF
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
