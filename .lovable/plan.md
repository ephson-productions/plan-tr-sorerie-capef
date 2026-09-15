# Plan de Trésorerie CAPEF

Application web institutionnelle en français qui remplace le classeur Excel de plan de trésorerie annuel de la CAPEF : saisie guidée en 5 étapes, calculs automatiques, sauvegarde en ligne et sortie imprimable A4 paysage à en-tête officiel.

Le fichier Excel joint a été analysé : ses trois feuilles (ENCAISSEMENTS 8 postes, DECAISSEMENTS 15 postes, SITUATION DE TRESORERIE 6 lignes, 12 mois Janvier→Décembre) servent de référence exacte pour les libellés, l'ordre des postes et les totaux.

## Ce que l'utilisateur pourra faire

1. **Se connecter** avec email et mot de passe. Aucune donnée n'est visible sans connexion. Pas d'inscription publique : les comptes du personnel autorisé sont créés manuellement. Lien « Mot de passe oublié » avec réinitialisation par email et page dédiée pour choisir le nouveau mot de passe. Bouton de déconnexion toujours visible.
2. **Voir « Mes plans de trésorerie »** après connexion : liste des exercices (année, période, statut brouillon/finalisé, date de modification), avec actions Ouvrir, Dupliquer vers une autre année, Supprimer, et bouton « Nouveau plan ».
3. **Remplir l'assistant en 5 étapes** avec une barre d'étapes cliquable numérotée 01 à 05 (étape active et étapes complétées distinguées visuellement) et boutons Précédent / Suivant :
   - 01 Informations générales : exercice, période, unité monétaire (FCFA par défaut), solde initial de trésorerie, nom de l'institution.
   - 02 Encaissements : 8 postes × 12 mois, total annuel par poste, total mensuel par colonne, total général.
   - 03 Décaissements : 15 postes × 12 mois, mêmes totaux.
   - 04 Situation de trésorerie : tableau entièrement calculé, non modifiable.
   - 05 Aperçu et impression.
4. **Sauvegarder à tout moment** : enregistrement en brouillon depuis n'importe quelle étape (plus sauvegarde automatique après modification), reprise plus tard, passage au statut « finalisé ».
5. **Imprimer** : page A4 paysage, marges ~8 mm, en-tête officiel en pleine largeur, titre centré « PLAN DE TRÉSORERIE » avec exercice / période / unité monétaire en sous-titre, puis les trois tableaux. Les menus, la barre d'étapes et les boutons n'apparaissent pas à l'impression. L'export PDF passe par la boîte d'impression du navigateur.

## Règles de calcul (identiques au classeur)

- Total encaissements du mois = somme des 8 postes de recettes.
- Total décaissements du mois = somme des 15 postes de dépenses.
- Solde initial de Janvier = valeur saisie à l'étape 01 ; pour les mois suivants = solde cumulé du mois précédent.
- Disponibilités = solde initial du mois + total des encaissements.
- Solde mensuel = total des encaissements − total des décaissements.
- Solde cumulé = disponibilités − total des décaissements.
- Tous les recalculs sont instantanés pendant la saisie.
- Nombres affichés avec espace comme séparateur de milliers (1 250 000), jamais en notation scientifique ; les soldes négatifs en rouge et gras dans le tableau de situation.

## En-tête officiel

Le gabarit d'impression réserve en haut une zone pleine largeur pour l'image bilingue de l'en-tête CAPEF. Tant que le fichier n'est pas fourni, un cadre placeholder visible portant la mention « En-tête officiel CAPEF » occupe cette zone ; l'image sera insérée ensuite sans autre modification de mise en page.

## Direction visuelle

Identité institutionnelle sobre : vert profond #1F3A2E (primaire), doré #B98B3E (accent), fond crème #F7F4EC, cartes blanches, texte encre #232420. Titres en serif institutionnelle, formulaires et tableaux en sans-serif système. Tableaux façon registre comptable : filets fins, nombres alignés à droite, en-têtes de colonnes vert foncé sur fond clair, pas d'ombres ni de coins très arrondis. Interface entièrement en français.

## Détails techniques

- **Base de données** : une table `plans_tresorerie` (exercice, période, unité monétaire, solde initial, institution, statut brouillon/finalisé, valeurs d'encaissements et de décaissements stockées en JSON structuré 8×12 et 15×12, horodatages, propriétaire). Contrainte d'unicité souple sur l'exercice par utilisateur pour éviter les doublons involontaires, avec message clair côté interface.
- **Sécurité** : RLS activé, GRANT pour le rôle authentifié uniquement ; aucun accès anonyme. Lecture/écriture réservées aux utilisateurs connectés.
- **Auth** : email/mot de passe Supabase, inscription publique non exposée dans l'interface, page `/reset-password` publique pour la récupération.
- **Routes** : `/` connexion (redirection vers la liste si session active), `/reset-password`, puis zone protégée : liste des plans et assistant `/plans/$id` avec l'étape en paramètre d'URL.
- **Lecture/écriture** : fonctions serveur authentifiées pour lister, charger, créer, mettre à jour, dupliquer et supprimer un plan ; état de saisie en mémoire côté page avec calculs dérivés, écriture groupée à la sauvegarde.
- **Impression** : feuille de style `@media print` (A4 paysage, marges 8 mm, masquage de la navigation, évitement des coupures de tableau).
- **Métadonnées** : titre et description propres pour la connexion, la liste et l'assistant.
