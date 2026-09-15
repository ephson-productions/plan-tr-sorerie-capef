# Plan Trésorerie CAPEF

Créer un nouveau projet avec Supabase activé. Construis une application web appelée "Plan de Trésorerie CAPEF", un outil institutionnel pour la CAPEF (Chambre d'Agriculture, des Pêches, de l'Élevage et des Forêts du Cameroun) qui remplace un classeur Excel de planification de trésorerie annuelle. L'app doit reproduire exactement la logique financière ci-dessous(LE FICHIER EXCELL ATACHÉ EST LA BASE DU PROHET), avec un formulaire guidé en étapes, un calcul automatique en temps réel, et une sortie imprimable à en-tête officiel.

Contexte et logique métier

Le plan de trésorerie couvre un exercice annuel (12 mois, Janvier à Décembre), en FCFA, structuré en trois blocs :

I. Encaissements prévisionnels — 8 postes de recettes, saisis mois par mois :

Subvention de l'État (MINFI, MINADER et MINFOF)

Centimes Additionnels Consulaires

Redevance Cacao et Café

Taxe d'Inspection Sanitaire et Vétérinaire

Produits de location d'Immeubles

Produits de location de la salle

Dons et legs

Autres recettes

II. Décaissements prévisionnels — 15 postes de dépenses, saisis mois par mois :

Salaires et traitements

Indemnités et primes

Charges sociales

Achats de fournitures

Eau, électricité, téléphone

Loyers et charges locatives

Entretien et maintenance

Missions et déplacements

Communication

Prestations de services

Impôts, taxes et droits

Remboursement de dettes

Investissements

Subventions aux Unités Opérationnelles

Autres dépenses

III. Situation de trésorerie — calculée automatiquement, mois par mois :

Solde initial du mois = solde initial saisi par l'utilisateur pour Janvier, puis = Solde cumulé du mois précédent pour les mois suivants (report automatique).

Total des encaissements (+) = somme des 8 postes de recettes du mois.

Disponibilités (=) = Solde initial du mois + Total des encaissements.

Total des décaissements (−) = somme des 15 postes de dépenses du mois.

Solde mensuel (=) = Total des encaissements − Total des décaissements.

Solde cumulé de trésorerie = Disponibilités − Total des décaissements (équivalent à solde cumulé précédent + solde mensuel du mois).

Chaque tableau (Encaissements, Décaissements) affiche aussi une colonne "Total annuel" par poste et une ligne "Total mensuel" par mois, plus un total général annuel.

Parcours utilisateur (formulaire en 5 étapes)

Informations générales : exercice, période, unité monétaire (FCFA par défaut), solde initial de trésorerie, nom de l'institution.

Encaissements : tableau de saisie des 8 postes × 12 mois, avec totaux calculés en direct.

Décaissements : tableau de saisie des 15 postes × 12 mois, avec totaux calculés en direct.

Situation de trésorerie : tableau récapitulatif, entièrement calculé, non éditable.

Aperçu et impression : mise en page A4 paysage avec en-tête officiel CAPEF en haut de page, les trois tableaux, et un bouton "Imprimer" qui déclenche l'impression navigateur (ou export PDF) sans afficher le reste de l'interface (menus, boutons de navigation).

Navigation : barre d'étapes cliquable en haut (numérotée 01 à 05), avec indication visuelle de l'étape active et des étapes complétées. Boutons "Précédent / Suivant" en bas.

Exigences pour l'impression

Format A4 paysage, marges ~8mm.

En-tête officiel CAPEF (image bilingue avec les armoiries et le bandeau vert/rouge) en pleine largeur, en haut de la page imprimée. Je fournirai le fichier image de l'en-tête après la génération initiale — prévois une zone dédiée en haut du gabarit d'impression où cette image sera insérée à pleine largeur, avec un espace réservé/placeholder visible tant qu'elle n'est pas intégrée.

Titre du document centré sous l'en-tête : "PLAN DE TRÉSORERIE", avec l'exercice, la période et l'unité monétaire en sous-titre.

Les nombres doivent être formatés avec espace comme séparateur de milliers (ex. 1 250 000), jamais en notation scientifique.

Les soldes négatifs doivent apparaître en rouge/gras dans le tableau de situation de trésorerie.

Authentification et persistance des données (Supabase)

Utilise Supabase comme backend (base de données + authentification) :

Authentification : connexion par email/mot de passe via Supabase Auth. Écran de connexion obligatoire avant d'accéder à l'assistant en étapes — aucune donnée n'est visible sans être connecté. Prévoir : page de connexion, réinitialisation de mot de passe par email, bouton de déconnexion visible dans l'interface. Un seul niveau d'accès suffit pour l'instant (pas de rôles/permissions différenciés) ; les comptes seront créés manuellement pour le personnel autorisé de la CAPEF (pas d'auto-inscription publique).

Base de données : table Supabase pour stocker chaque plan de trésorerie (un enregistrement par exercice/année), incluant les informations générales, les 8×12 valeurs d'encaissements, les 15×12 valeurs de décaissements, et le statut (brouillon / finalisé). Un plan doit pouvoir être créé, sauvegardé en brouillon à n'importe quelle étape, repris, modifié, et dupliqué d'une année sur l'autre.

Sécurité : active les Row Level Security (RLS) policies de Supabase pour que seuls les utilisateurs authentifiés puissent lire/écrire les données.

Prévoir un écran "Mes plans de trésorerie" (liste des exercices déjà créés, avec statut) comme point d'entrée après connexion, avant d'ouvrir l'assistant en étapes.

Direction visuelle

Identité institutionnelle sobre, pas un style "SaaS" générique :

Palette : vert profond #1F3A2E (primaire), doré/ocre #B98B3E (accent), fond crème #F7F4EC, blanc #FFFFFF pour les cartes, encre #232420 pour le texte.

Typographie : une police serif institutionnelle (type Georgia/Times) pour les titres, une police sans-serif lisible (system-ui) pour les formulaires et les tableaux denses.

Tableaux façon registre comptable : lignes de séparation fines, alignement des nombres à droite, en-têtes de colonnes en vert foncé sur fond blanc/crème — pas de cartes arrondies ni d'ombres portées décoratives.

Étapes numérotées "01, 02, 03..." car le contenu est réellement séquentiel.

Langue

Toute l'interface est en français.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/70cac97e-9cc0-4334-87f5-5dd85c1ae90b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
