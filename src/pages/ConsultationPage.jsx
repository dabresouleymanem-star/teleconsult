// ConsultationPage.jsx — Formulaire de création d'une consultation (Encounter FHIR)
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { createEncounter } from '../services/fhirService';
import { getCurrentUser } from '../services/authService';

function ConsultationPage() {
  const [patientId, setPatientId] = useState('');
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (!patientId.trim() || !reason.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      const result = await createEncounter(patientId, reason, getCurrentUser());
      setSuccess(result.id);
      setPatientId('');
      setReason('');
    } catch (err) {
      setError("Erreur lors de l'enregistrement de la consultation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <NavBar />
      <main role="main" aria-label="Nouvelle consultation" style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
        <h1>📋 Nouvelle consultation</h1>
        <p>Créez une ressource FHIR Encounter liée à un patient existant.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="patientId">ID FHIR du patient</label>
          <input
            id="patientId"
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="ex: 123456 (trouvé via Dossier patient)"
            aria-required="true"
            style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0 1rem' }}
          />

          <label htmlFor="reason">Motif de la consultation</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            aria-required="true"
            rows={4}
            style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0 1rem' }}
          />

          {error && <p role="alert" style={{ color: '#C0392B' }}>{error}</p>}
          {success && (
            <p role="status" style={{ color: '#00875A' }}>
              ✅ Consultation enregistrée avec succès (ID FHIR : {success})
            </p>
          )}

          <button type="submit" disabled={loading} style={{ padding: '0.6rem 1.2rem' }}>
            {loading ? 'Enregistrement...' : 'Enregistrer la consultation'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default ConsultationPage;