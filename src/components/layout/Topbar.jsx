export default function Topbar() {
  return (
    <header className="topbar">
      <input className="search" placeholder="Suche Fahrzeuge..." />

      <div className="topbar-icons">
        <span className="icon" />
        <span className="icon" />
        <span className="icon" />
      </div>

      <div className="username">Username</div>
    </header>
  );
}
