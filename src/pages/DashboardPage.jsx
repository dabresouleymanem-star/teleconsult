// DashboardPage.jsx — Tableau de bord principal
import NavBar from '../components/NavBar';

function DashboardPage() {
  return (
    <div>
      <NavBar />
      <main role="main" aria-label="Tableau de bord" style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
        <h1>Tableau de bord</h1>
        <p>Bienvenue. Utilisez le menu ci-dessus pour accéder au dossier patient, créer une consultation ou enregistrer une mesure vitale.</p>
      </main>
    </div>
  );
}

export default DashboardPage;