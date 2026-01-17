import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import "../components/Homepage.css";

// Dummy-Daten – jetzt mit mehr Details und (Beispiel-)Bildern
const carDetails = {
  "mini-cooper": {
    title: "Mini Cooper",
    description: "Kompakt & stylisch",
    features: ["Klimaanlage", "Automatik", "Bluetooth"],
    price: "60 CHF pro Tag",
    year: 2021,
    color: "Rot",
    engine: "Benzin, 100 kW",
    seats: 4,
    consumption: "5.2 L/100km",
    licensePlate: "ZH 12345",
    image: "https://www.bmw.ch/content/dam/bmw/common/all-models/mini/3-door/2021/at-a-glance/mini-3-door-overview-sp-desktop.jpg", // Beispiel-URL
  },
  "vw-polo": {
    title: "VW Polo",
    description: "Zuverlässig & wendig",
    features: ["Klimaanlage", "Manuell", "Multimedia"],
    price: "50 CHF pro Tag",
    year: 2022,
    color: "Silber",
    engine: "Benzin, 81 kW",
    seats: 5,
    consumption: "5.5 L/100km",
    licensePlate: "ZH 54321",
    image: "https://www.volkswagen.ch/content/dam/vw-ngw/vw_pkw/importers/ch/models/polo/1-2/gallery/PO_1_1_2_1920x1080.jpg",
  },
  "bmw-x5": {
    title: "BMW X5",
    description: "SUV mit Luxus",
    features: ["Allrad", "Lederausstattung", "Navigation"],
    price: "120 CHF pro Tag",
    year: 2023,
    color: "Schwarz",
    engine: "Diesel, 210 kW",
    seats: 5,
    consumption: "7.1 L/100km",
    licensePlate: "ZH 99999",
    image: "https://www.bmw.ch/content/dam/bmw/marketCH/bmw_ch/Images/modelle/X5/x5-m50i-m50d/2022/bmw-x-series-x5-gallery-04.jpg",
  },
  "audi-q7": {
    title: "Audi Q7",
    description: "Komfortabel & groß",
    features: ["Panorama-Dach", "Allrad", "Soundsystem"],
    price: "130 CHF pro Tag",
    year: 2022,
    color: "Weiss",
    engine: "Diesel, 210 kW",
    seats: 7,
    consumption: "6.9 L/100km",
    licensePlate: "ZH 33333",
    image: "https://www.audi.ch/content/dam/nemo/models/q7/q7/my-2023/1920x1080-desktop/auq7-2023-1920x1080.jpg",
  },
  "tesla-model-3": {
    title: "Tesla Model 3",
    description: "Elektrisch & modern",
    features: ["Autopilot", "Elektrisch", "Großer Touchscreen"],
    price: "100 CHF pro Tag",
    year: 2022,
    color: "Blau",
    engine: "Elektro, 150 kW",
    seats: 5,
    consumption: "16.2 kWh/100km",
    licensePlate: "ZH 98765",
    image: "https://tesla-cdn.thron.com/delivery/public/image/tesla/0460be69-532a-48b6-b343-5600cd6ddf2a/bvlatuR/std/1920x1080/_25-Hero-D",
  },
  "vw-id-4": {
    title: "VW ID.4",
    description: "Nachhaltig & geräumig",
    features: ["Elektrisch", "Geräumig", "Assistenzsysteme"],
    price: "90 CHF pro Tag",
    year: 2023,
    color: "Gelb",
    engine: "Elektro, 150 kW",
    seats: 5,
    consumption: "18.0 kWh/100km",
    licensePlate: "ZH 22222",
    image: "https://www.volkswagen.ch/content/dam/vw-ngw/vw_pkw/importers/ch/models/id-4/gallery/ID.4_2023_Gallery_01.jpg",
  },
  "mercedes-s-klasse": {
    title: "Mercedes S-Klasse",
    description: "Premium-Luxus",
    features: ["Massage-Sitze", "Premium-Sound", "Komfortpaket"],
    price: "200 CHF pro Tag",
    year: 2023,
    color: "Schwarz",
    engine: "Hybrid, 270 kW",
    seats: 5,
    consumption: "7.0 L/100km",
    licensePlate: "ZH 99887",
    image: "https://www.mercedes-benz.ch/passengercars/mercedes-benz-cars/models/s-class/saloon-wv223/explore/design/_jcr_content/image.1920x1080.jpeg",
  },
  "bmw-7er": {
    title: "BMW 7er",
    description: "Exklusiv & komfortabel",
    features: ["Leder", "Navigation", "Sitzheizung"],
    price: "180 CHF pro Tag",
    year: 2021,
    color: "Dunkelgrau",
    engine: "Hybrid, 210 kW",
    seats: 5,
    consumption: "6.5 L/100km",
    licensePlate: "ZH 22113",
    image: "https://www.bmw.ch/content/dam/bmw/common/all-models/7-series/sedan/2021/at-a-glance/bmw-7series-sedan-gallery-01.jpg",
  },
  "vw-touran": {
    title: "VW Touran",
    description: "Familienfreundlich & sicher",
    features: ["7 Sitze", "Kindersicherung", "Großer Kofferraum"],
    price: "80 CHF pro Tag",
    year: 2020,
    color: "Weiss",
    engine: "Benzin, 110 kW",
    seats: 7,
    consumption: "6.4 L/100km",
    licensePlate: "ZH 55555",
    image: "https://www.volkswagen.ch/content/dam/vw-ngw/vw_pkw/importers/ch/models/touran/gallery/Touran_Front.jpg",
  },
  "ford-galaxy": {
    title: "Ford Galaxy",
    description: "Viel Platz für alle",
    features: ["Viel Platz", "Familienpaket", "Navigation"],
    price: "85 CHF pro Tag",
    year: 2021,
    color: "Silber",
    engine: "Diesel, 140 kW",
    seats: 7,
    consumption: "6.8 L/100km",
    licensePlate: "ZH 44444",
    image: "https://www.ford.ch/content/dam/guxeu/ch/vehicles/galaxy/bfp/3-2/BFP_CHL_Galaxy_Front_3_4_Grey.png",
  },
  "porsche-911": {
    title: "Porsche 911",
    description: "Sport & Performance",
    features: ["Sportfahrwerk", "Starke Motorleistung", "Sportdesign"],
    price: "220 CHF pro Tag",
    year: 2022,
    color: "Weiss",
    engine: "Benzin, 283 kW",
    seats: 2,
    consumption: "9.5 L/100km",
    licensePlate: "ZH 91111",
    image: "https://files.porsche.com/filestore/image/multimedia/none/992-c2-modelimage-sideshot/model/5c4d9f1b-39cc-11ea-810e-005056bbdc38;sM;twebp/porsche-model.png",
  },
  "audi-tt": {
    title: "Audi TT",
    description: "Stylisch & schnell",
    features: ["Schneller Motor", "Coupé Design", "Soundsystem"],
    price: "110 CHF pro Tag",
    year: 2021,
    color: "Blau",
    engine: "Benzin, 180 kW",
    seats: 4,
    consumption: "7.0 L/100km",
    licensePlate: "ZH 77777",
    image: "https://www.audi.ch/content/dam/nemo/models/tt/tt-coupe/my-2023/NeMo-Derivate-Startseite/1920x1080-tt-coupe.png",
  },
};

export default function CarDetailPage() {
  const { slug } = useParams();
  const car = carDetails[slug];

  if (!car) {
    return (
      <div className="homepage">
        <Sidebar />
        <main className="main">
          <Topbar />
          <div>Fahrzeug nicht gefunden.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="homepage">
      <Sidebar />
      <main className="main">
        <Topbar />
        <section className="hero">
          <h2>{car.title}</h2>
          <p>{car.description}</p>
        </section>
        <section className="section">
          <div className="car-card">
            <div className="car-image" style={{
              background: `url(${car.image}) center center/cover no-repeat, #e5e7eb`,
              height: 180,
              marginBottom: 18,
            }} />
            <ul>
              <li><strong>Baujahr:</strong> {car.year}</li>
              <li><strong>Farbe:</strong> {car.color}</li>
              <li><strong>Motor:</strong> {car.engine}</li>
              <li><strong>Sitzplätze:</strong> {car.seats}</li>
              <li><strong>Verbrauch:</strong> {car.consumption}</li>
              <li><strong>Kennzeichen:</strong> {car.licensePlate}</li>
            </ul>
            <h4>Ausstattung</h4>
            <ul>
              {car.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <p><strong>Preis:</strong> {car.price}</p>
            <Link to="/categories">
              <button>Zurück zu den Kategorien</button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
