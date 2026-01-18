import { Link } from "react-router-dom";

export default function CTABox() {
  return (
    <section className="cta">
      <div>
        <h3>Bereit für Ihre nächste Fahrt?</h3>
        <p>Über 500 Fahrzeuge – von Compact bis Luxury</p>
        <Link to={"/categories"}>
        <button>Fahrzeuge entdecken</button>
      </Link>
      </div>
      <div className="cta-icon" />
    </section>
  );
}
