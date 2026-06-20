// ObservationPage.jsx — Formulaire de saisie d'une mesure vitale (Observation FHIR)
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { createObservation } from '../services/fhirService';

// Types de mesures avec leur code LOINC officiel (standard médical international)
const MEASURE_TYPES = [
  { code: '8480-6', label: 'Tension artérielle systolique', unit: 'mmHg' },
  { code: '8310-5', label: 'Température corporelle', unit: '°C' },
  { code: '29463-7', label: 'Poids', unit: 'kg' },
  { code: '8867-4', label: 'Fréquence cardiaque', unit: 'bpm' }
];

function ObservationPage() {
  const [patientId, setPatientId] = useState('');
  const [measureType, setMeasureType] = useState(MEASURE_TYPES[0].code);
  const [value, setValue] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (!patientId.trim() || !value.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    const selected = MEASURE_TYPES.find((m) => m.code === measureType);

    setLoading(true);
    try {
      const result = await createObservation(
        patientId,
        selected.code,
        selected.label,
        value,
        selected.unit
      );
      setSuccess(result.id);
      setValue('');
    } catch (err) {
      setError("Erreur lors de l'enregistrement de la mesure.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <NavBar />
      <main role="main" aria-label="Mesures vitales" style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
        <h1>📊 Mesures vitales</h1>
        <p>Enregistrez une mesure clinique (ressource FHIR Observation, code LOINC).</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="patientId">ID FHIR du patient</label>
          <input
            id="patientId"
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="ex: 123456"
            aria-required="true"
            style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0 1rem' }}
          />

          <label htmlFor="measureType">Type de mesure</label>
          <select
            id="measureType"
            value={measureType}
            onChange={(e) => setMeasureType(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0 1rem' }}
          >
            {MEASURE_TYPES.map((m) => (
              <option key={m.code} value={m.code}>
                {m.label} ({m.unit})
              </option>
            ))}
          </select>

          <label htmlFor="value">Valeur mesurée</label>
          <input
            id="value"
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-required="true"
            style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0 1rem' }}
          />

          {error && <p role="alert" style={{ color: '#C0392B' }}>{error}</p>}
          {success && (
            <p role="status" style={{ color: '#00875A' }}>
              ✅ Mesure enregistrée avec succès (ID FHIR : {success})
            </p>
          )}

          <button type="submit" disabled={loading} style={{ padding: '0.6rem 1.2rem' }}>
            {loading ? 'Enregistrement...' : 'Enregistrer la mesure'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default ObservationPage;