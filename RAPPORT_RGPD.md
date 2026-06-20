# Rapport de Conformité RGPD
## Application de Téléconsultation - FHIR R4

**Auteurs :** Groupe 8 : 
DABRE Souleymane
KOAMA Ahmed Malick dit Rahim
THIOMBIANO Jules
OUEDRAOGO Wendyam Ahmed Arthur

**Établissement :** Université Virtuelle du Burkina Faso - Master Télémédecine & e-Santé
**Référence :** Règlement (UE) 2016/679 du 27 avril 2016

---

### 1. Contexte et périmètre

Cette application web de téléconsultation traite des données de santé (dossiers patients, consultations, mesures vitales) via le standard FHIR R4, sur un serveur HAPI FHIR public à usage académique. Le présent rapport décrit la conformité du projet au Règlement Général sur la Protection des Données (RGPD).

### 2. Données collectées et finalités

L'application collecte : identité du patient (nom, date de naissance, genre), motif de consultation, mesures vitales (tension, température, poids, fréquence cardiaque). Ces données sont collectées dans la seule finalité du suivi médical à distance (téléconsultation).

### 3. Base légale du traitement

Conformément à l'Article 9 du RGPD, les données de santé constituent une catégorie particulière nécessitant un consentement explicite du patient ou une base légale spécifique (intérêt vital, soins médicaux). Dans le cadre académique de ce projet, le traitement repose sur le consentement simulé de l'utilisateur lors de l'authentification.

### 4. Sécurité technique

Les mesures suivantes sont mises en œuvre :
- **Anti-XSS** : toutes les données affichées sont nettoyées via DOMPurify avant rendu
- **Authentification** : token JWT en sessionStorage (non persistant), expiration après 1h
- **Transport** : connexion HTTPS au serveur FHIR
- **Minimisation** : seules les données nécessaires au suivi médical sont collectées

### 5. Droits des personnes concernées

Conformément aux Articles 15 à 22 du RGPD, les patients bénéficient de : droit d'accès à leur dossier (export FHIR JSON), droit de rectification, droit à la portabilité (format FHIR R4 JSON), droit d'opposition, droit à l'effacement (limité par les obligations de conservation des dossiers médicaux).

### 6. Durée de conservation

Les données médicales sont conservées 20 ans après le dernier acte médical, conformément à la réglementation sanitaire applicable. Les journaux de connexion sont conservés 3 ans, après quoi ils sont supprimés ou anonymisés.

### 7. Transferts et sous-traitants

Les données sont stockées sur le serveur HAPI FHIR public (usage académique/test uniquement). En production, l'hébergement devrait se faire dans l'Union Européenne ou un pays offrant un niveau de protection adéquat reconnu par la Commission européenne.

### 8. Violations et notification

En cas de violation de données, la procédure prévoit : détection via journal d'audit, notification à l'autorité de contrôle compétente dans les 72 heures (Art. 33 RGPD), information des personnes concernées si le risque est élevé pour leurs droits.

---

**Responsable de traitement :** [GROUP8 — UVBF]
**Référence académique :** Cours Session_TelemWEB_3.pdf, p.18-21