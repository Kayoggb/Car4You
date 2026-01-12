export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Car4You</div>

      <nav className="sidebar-nav">
        <a className="nav-item active">Home</a>
        <a className="nav-item">Kategorien</a>
        <a className="nav-item">Favoriten</a>
        <a className="nav-item">Käufe</a>
        <a className="nav-item">Profil</a>
      </nav>

      <button className="logout">Ausloggen</button>
    </aside>
  );
}
