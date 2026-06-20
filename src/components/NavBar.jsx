// NavBar.jsx — Barre de navigation
import { Link, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';

function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav aria-label="Navigation principale" style={{ background: '#0B3D91', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/dashboard" style={{ color: 'white', fontWeight: 'bold' }}>🏠 Accueil</Link>
        <Link to="/patient" style={{ color: 'white' }}>👤 Dossier patient</Link>
        <Link to="/consultation" style={{ color: 'white' }}>📋 Consultation</Link>
        <Link to="/observation" style={{ color: 'white' }}>📊 Mesures vitales</Link>
      </div>
      <div style={{ color: 'white', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>{getCurrentUser()}</span>
        <button onClick={handleLogout} style={{ padding: '0.4rem 0.8rem' }}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default NavBar;