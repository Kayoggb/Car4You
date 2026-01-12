import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-logo">Car4You</NavLink>

      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>

        <NavLink to="/categories" className="nav-item">
          Kategorien
        </NavLink>

        <NavLink to="/favorites" className="nav-item">
          Favoriten
        </NavLink>

        <NavLink to="/profile" className="nav-item">
          Profil
        </NavLink>
      </nav>

      <button className="logout">Ausloggen</button>
    </aside>
  );
}
