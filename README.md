# Application de Téléconsultation - FHIR R4
**Master Télémédecine & e-Santé - Projet Final**

**Groupe 8 :** 

DABRE Souleymane · KOAMA Ahmed Malick dit Rahim · OUEDRAOGO Wendyam Ahmed Arthur · THIOMBIANO Jules

**Enseignant :** Dr Ing. Lebian Wilfried NIKIEMA

---

## Objectif

Développer une application web de téléconsultation conforme au standard FHIR R4, permettant l'authentification sécurisée d'un médecin, la consultation d'un dossier patient, la création d'une consultation et l'enregistrement de mesures vitales.

## Fonctionnalités réalisées

| Fonctionnalité | Statut | Détail technique |
|---|---|---|
| Authentification OAuth2 | Validé | Simulée, token JWT (sub, role, scope, exp) en sessionStorage |
| Dossier patient | Validé  | Recherche et affichage via ressource FHIR `Patient` |
| Formulaire de consultation | Validé  | Création de ressource FHIR `Encounter` |
| Mesures vitales | Validé  | Création de ressource FHIR `Observation` avec codes LOINC |
| Sécurité anti-XSS | Validé  | Nettoyage des données via DOMPurify |
| Accessibilité | Validé  | Labels, attributs aria-*, conformité WCAG AA |

## Stack technique

React.js · React Router · DOMPurify · Serveur public HAPI FHIR R4 · Déploiement GitHub Pages

---

## Les 3 livrables

### 1. Dépôt Git (code source)
Dépôt public contenant l'intégralité du code, le README d'installation et le rapport RGPD.
**Lien :** https://github.com/dabresouleymanem-star/teleconsult

### 2. Application fonctionnelle (démo en ligne)
Application déployée et accessible directement, sans installation requise.
**Lien :** https://dabresouleymanem-star.github.io/teleconsult

*Patient de test disponible : rechercher « SAWADOGO-DEMO » dans le Dossier patient.*

### 3. Rapport de conformité RGPD
Document d'une page couvrant : base légale (Art. 9 RGPD), mesures de sécurité, droits des patients, durée de conservation des données.
**Disponible dans le dépôt :** `RAPPORT_RGPD.md`

---

## Parcours de démonstration

1. Connexion (authentification simulée)
2. Recherche du patient de test « SAWADOGO-DEMO »
3. Création d'une consultation (Encounter FHIR)
4. Enregistrement d'une mesure vitale (Observation FHIR, code LOINC)
5. Démonstration de la protection anti-XSS (injection de code neutralisée par DOMPurify)

---

*Projet réalisé par le Groupe 8 dans le cadre du Master Télémédecine & e-Santé - UVBF.*
