// authService.js — Simulation OAuth2 / SMART on FHIR
// Source : cours Session_TelemWEB_3.pdf, p.12-17

// Scopes SMART on FHIR : ce que l'utilisateur connecté a le droit de faire
const SCOPES = 'patient/Patient.read patient/Observation.write user/Encounter.write openid profile';

// Simule la création d'un token JWT (normalement fait par un vrai serveur OAuth2)
function generateFakeJWT(username, role) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: username,           // identifiant de l'utilisateur
    role: role,              // ex: "practitioner" (médecin) ou "patient"
    scope: SCOPES,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 // expire dans 1 heure
  };
  // Encodage simplifié (pas une vraie signature cryptographique — c'est une simulation pédagogique)
  const encode = (obj) => btoa(JSON.stringify(obj));
  return `${encode(header)}.${encode(payload)}.FAKE_SIGNATURE`;
}

// Connexion : appelée quand l'utilisateur clique "Se connecter"
export function login(username, role = 'practitioner') {
  const token = generateFakeJWT(username, role);
  sessionStorage.setItem('teleconsult_token', token);
  sessionStorage.setItem('teleconsult_user', username);
  return token;
}

// Déconnexion
export function logout() {
  sessionStorage.removeItem('teleconsult_token');
  sessionStorage.removeItem('teleconsult_user');
}

// Vérifie si l'utilisateur est connecté ET que son token n'a pas expiré
export function isAuthenticated() {
  const token = sessionStorage.getItem('teleconsult_token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch (e) {
    return false;
  }
}

// Récupère le token actuel (utilisé pour les appels FHIR plus tard)
export function getToken() {
  return sessionStorage.getItem('teleconsult_token');
}

export function getCurrentUser() {
  return sessionStorage.getItem('teleconsult_user');
}