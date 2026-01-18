import { Link } from "react-router-dom";
import "./Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <input className="search" placeholder="Suche Fahrzeuge..." />

      <div className="topbar-icons">
        <span className="icon" />
        <span className="icon" />
        <span className="icon" />
      </div>

      <Link to="/profile">
      <div className="username">{localStorage.getItem("username")}</div>
      </Link>
    </header>
  );
}
