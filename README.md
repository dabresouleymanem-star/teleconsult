# Application de Téléconsultation - FHIR R4

Projet académique - Master Télémédecine & e-Santé, Université Virtuelle du Burkina Faso.
Cours : Dr Ing. Lebian Wilfried NIKIEMA

Membre du GROUPE 8 :
Groupe 8 :
DABRE Souleymane
KOAMA Ahmed Malick dit Rahim
OUEDRAOGO Wendyam Ahmed Arthur
THIOMBIANO Jules

## Description

Application web React permettant la gestion d'une téléconsultation médicale : authentification sécurisée (OAuth2/SMART on FHIR simulé), recherche de dossier patient, création de consultations (Encounter FHIR) et enregistrement de mesures vitales (Observation FHIR), avec protection anti-XSS et accessibilité WCAG AA.

## Fonctionnalités

- Authentification OAuth2/SMART on FHIR (simulée, token JWT en sessionStorage)
- Recherche et affichage de dossier patient (ressource FHIR Patient)
- Création de consultation (ressource FHIR Encounter)
- Enregistrement de mesures vitales avec codes LOINC (ressource FHIR Observation)
- Protection anti-XSS via DOMPurify
- Accessibilité WCAG AA (labels, aria-*, contrastes)

## Stack technique

- **Frontend** : React.js, React Router
- **Serveur FHIR** : HAPI FHIR public (https://hapi.fhir.org/baseR4)
- **Sécurité** : DOMPurify (anti-XSS)

## Installation et lancement

```bash
# Cloner le dépôt
git clone https://github.com/dabresouleymanem-star/teleconsult.git
cd teleconsult

# Installer les dépendances
npm install

# Créer un fichier .env à la racine avec :
# REACT_APP_FHIR_BASE_URL=https://hapi.fhir.org/baseR4
# REACT_APP_CLIENT_ID=teleconsult-demo
# REACT_APP_REDIRECT_URI=http://localhost:3000/callback

# Lancer l'application
npm start
```

L'application est accessible sur http://localhost:3000

## Utilisation

1. Se connecter avec n'importe quel nom (authentification simulée)
2. Rechercher un patient existant sur le serveur HAPI FHIR public
3. Créer une consultation liée à ce patient
4. Enregistrer une mesure vitale (tension, température, poids, fréquence cardiaque)

## Sécurité

- Le token de session expire après 1h et est stocké en `sessionStorage` (jamais `localStorage`)
- Toutes les données affichées venant du serveur externe sont nettoyées via `DOMPurify.sanitize()`
- Aucune clé secrète n'est commitée (voir `.gitignore`)

## Conformité

- **FHIR R4** : ressources Patient, Encounter, Observation conformes au standard HL7
- **RGPD** : voir le rapport de conformité dédié

## Auteur

Projet réalisé dans le cadre du Master Télémédecine & e-Santé — UVBF.