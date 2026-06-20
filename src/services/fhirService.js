// fhirService.js — Connexion au serveur HAPI FHIR public
// Source : cours Session_TelemWEB_3.pdf (notions FHIR R4)

const FHIR_BASE_URL = process.env.REACT_APP_FHIR_BASE_URL;

// En-têtes standards exigés par un serveur FHIR
function getHeaders() {
  return {
    'Content-Type': 'application/fhir+json',
    'Accept': 'application/fhir+json'
  };
}

// Rechercher un patient par son nom
export async function searchPatient(name) {
  const res = await fetch(`${FHIR_BASE_URL}/Patient?name=${encodeURIComponent(name)}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Erreur lors de la recherche du patient');
  const data = await res.json();
  return data.entry ? data.entry.map(e => e.resource) : [];
}

// Récupérer un patient précis par son identifiant FHIR
export async function getPatient(id) {
  const res = await fetch(`${FHIR_BASE_URL}/Patient/${id}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Patient introuvable');
  return res.json();
}

// Créer une consultation (Encounter)
export async function createEncounter(patientId, reason, practitionerName) {
  const encounter = {
    resourceType: 'Encounter',
    status: 'finished',
    class: {
      system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
      code: 'VR',
      display: 'Téléconsultation (virtuel)'
    },
    subject: { reference: `Patient/${patientId}` },
    reasonCode: [{ text: reason }],
    participant: [{ individual: { display: practitionerName } }],
    period: { start: new Date().toISOString() }
  };

  const res = await fetch(`${FHIR_BASE_URL}/Encounter`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(encounter)
  });
  if (!res.ok) throw new Error("Erreur lors de la création de la consultation");
  return res.json();
}

// Créer une mesure vitale (Observation) — ex: tension, température
export async function createObservation(patientId, loincCode, loincLabel, value, unit) {
  const observation = {
    resourceType: 'Observation',
    status: 'final',
    code: {
      coding: [{ system: 'http://loinc.org', code: loincCode, display: loincLabel }]
    },
    subject: { reference: `Patient/${patientId}` },
    effectiveDateTime: new Date().toISOString(),
    valueQuantity: { value: parseFloat(value), unit: unit }
  };

  const res = await fetch(`${FHIR_BASE_URL}/Observation`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(observation)
  });
  if (!res.ok) throw new Error("Erreur lors de l'enregistrement de la mesure");
  return res.json();
}

// Récupérer les observations (mesures) d'un patient
export async function getObservations(patientId) {
  const res = await fetch(`${FHIR_BASE_URL}/Observation?subject=Patient/${patientId}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Erreur lors de la récupération des mesures');
  const data = await res.json();
  return data.entry ? data.entry.map(e => e.resource) : [];
}
