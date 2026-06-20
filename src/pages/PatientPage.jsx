// PatientPage.jsx — Recherche et affichage d'un dossier patient FHIR
import { useState } from 'react';
import DOMPurify from 'dompurify';
import NavBar from '../components/NavBar';
import { searchPatient } from '../services/fhirService';

function PatientPage() {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const results = await searchPatient(query);
      setPatients(results);
      setSelected(null);
    } catch (err) {
      setError("Erreur lors de la recherche. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  }

  // Construit un nom lisible à partir d'une ressource FHIR Patient
  function getPatientName(p) {
    if (!p.name || p.name.length === 0) return '(nom inconnu)';
    const n = p.name[0];
    return `${(n.given || []).join(' ')} ${n.family || ''}`.trim();
  }

  return (
    <div>
      <NavBar />
      <main role="main" aria-label="Dossier patient" style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
        <h1>👤 Dossier Patient</h1>
        <p>Recherchez un patient sur le serveur FHIR (HAPI FHIR public).</p>

        <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="search">Nom du patient</label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ex: Diallo"
            aria-required="true"
            style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0 1rem' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '0.6rem 1.2rem' }}>
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </form>

        {error && <p role="alert" style={{ color: '#C0392B' }}>{error}</p>}

        {patients.length > 0 && (
          <ul aria-label="Résultats de recherche">
            {patients.map((p) => (
              <li key={p.id} style={{ marginBottom: '0.5rem' }}>
                <button
                  onClick={() => setSelected(p)}
                  style={{ background: 'none', border: '1px solid #D1D9E6', padding: '0.5rem 1rem', cursor: 'pointer' }}
                >
                  {/* DOMPurify protège contre l'injection XSS — donnée venant du serveur externe */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(getPatientName(p))
                    }}
                  />
                  {' '}(ID: {p.id})
                </button>
              </li>
            ))}
          </ul>
        )}

        {selected && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #D1D9E6', borderRadius: '8px' }}>
            <h2>Détails du patient</h2>
            <p><strong>Nom :</strong> {getPatientName(selected)}</p>
            <p><strong>ID FHIR :</strong> {selected.id}</p>
            <p><strong>Genre :</strong> {selected.gender || 'non renseigné'}</p>
            <p><strong>Date de naissance :</strong> {selected.birthDate || 'non renseignée'}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default PatientPage;