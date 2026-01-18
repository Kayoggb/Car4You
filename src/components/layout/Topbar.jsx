import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import { getAllVehicles } from "../../data/vehicles"; // Pfad ggf. anpassen!

export default function Topbar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() !== "") {
      const allVehicles = getAllVehicles();
      const filtered = allVehicles.filter((car) =>
        car.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <header className="topbar">
      <div className="search-container">
        <input
          className="search"
          placeholder="Suche Fahrzeuge..."
          value={search}
          onChange={handleSearch}
        />

        {/* Ergebnisse direkt unter dem Suchfeld */}
        {results.length > 0 && (
          <ul className="search-results">
            {results.map((car) => (
              <li key={car.slug}>
                <Link to={`/auto/${car.slug}`}>
                  {car.title}
                  <span className="search-category"> ({car.category})</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

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
