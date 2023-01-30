# m1p10mean-vonjy-abraham

## Table des matières

- [m1p10mean-vonjy-abraham](#m1p10mean-vonjy-abraham)
  - [Table des matières](#table-des-matières)
  - [Liens profils](#liens-profils)
  - [Technos](#technos)
  - [Fonctionnalités par profil](#fonctionnalités-par-profil)
    - [Général](#général)
      - [Login](#login)
    - [Client](#client)
      - [Lister et entrer des voitures](#lister-et-entrer-des-voitures)
      - [Voir détails de la voiture avec réparations actuelles](#voir-détails-de-la-voiture-avec-réparations-actuelles)
      - [Voir historique de réparations d'une voiture](#voir-historique-de-réparations-dune-voiture)
      - [Voir listes des factures](#voir-listes-des-factures)
      - [Payer une facture](#payer-une-facture)
    - [Montrer facture](#montrer-facture)
    - [Atelier](#atelier)
      - [Lister voiture](#lister-voiture)
      - [Drag and drop](#drag-and-drop)
      - [Validation bon de sortie](#validation-bon-de-sortie)
    - [Financier](#financier)
      - [Tableau de bord](#tableau-de-bord)
      - [Calcul bénéfice par mois](#calcul-bénéfice-par-mois)
      - [Valider paiements](#valider-paiements)
  - [Team](#team)
  - [License](#license)
## Liens profils

Cliquer sur les liens pour aller vers la page de login

- [Client](https://m1p10mean.onrender.com/login?email=vonjy@gmail.com&password=123456)
- [Atelier](https://m1p10mean.onrender.com/login?email=atelier@gmail.com&password=123456)
- [Financier](https://m1p10mean.onrender.com/login?email=financier@gmail.com&password=123456)

## Technos

- Angular
- Express JS
- MongoDb

## Fonctionnalités par profil

### Général

#### Login

Nous avons utilisé JWT pour gérer l'authentification et l'autorisation des connections.

![login](/assets/login.png)

### Client

#### Lister et entrer des voitures

Sur cet écran, le client peut:

- Entrer les informations d'une de ses voitures
- Voir ses voitures enregistrées avec leur status de réparation
- Naviguer vers les détails des réparations actuelles et l'historique de réparation

![liste-voiture-client](/assets/liste-voiture-client.gif)

#### Voir détails de la voiture avec réparations actuelles

Le client voit ici les détails de l'entrée en garage actuelle de la voiture.

![details-voiture-client](/assets/details-voiture-client.png)

#### Voir historique de réparations d'une voiture

Le client voit la liste des entrées en garage de la voiture et peut voir les détails en cliquant sur un élément.

![historique-reparations](/assets/historique-reparations.gif)

#### Voir listes des factures

Le client peut:

- voir la liste de ses factures avec leur état de paiement
- naviguer vers la page de paiement

![liste-factures](/assets/liste-factures.png)

#### Payer une facture

- Formulaire de paiement avec choix de méthode de paiement

![payer-facture](/assets/payer-facture.gif)

### Montrer facture

Cliquer sur `Détails` dans l'écran `liste facture` pour montrer la facture en détails.

![details-facture-btn](/assets/details-facture.png)

![details-facture](/assets/details-facture.gif)

### Atelier

#### Lister voiture

Le Responsable d'atelier peut:

- entrer une nouvelle entrée en garage d'une voiture
- voir la liste des entrées de voitures dans l'atelier
- cliquer sur le bouton voir pour naviguer vers les détails des réparations

![liste-entrees](/assets/liste-entrees.png)

#### Drag and drop

Le responsable d'atelier peut bouger les cartes de réparations pour changer leur avancement.
Lorsque toutes les réparations sont dans l'état `terminée`, le bon de sortie peut être validé.

![drag-drop-reparation](/assets/drag-drop-reparation.gif)

#### Validation bon de sortie

Cliquer sur le bouton `valider` valide la sortie du véhicule et `envoie un email au client` pour lui demander de récupérer sa voiture.

![valide-entree](/assets/valide-entree.gif)

### Financier

#### Tableau de bord

Sur cet écran, le responsable finance voit:

- La moyenne de temps de réparation
- Le chiffre d'affaire(CA) par mois de l'année en cours
- Le chiffre d'affaire par jour avec le mois selectionné pour l'année en cours

![chiffre-affaire-stat](/assets/chiffre-affaire-stat.png)

#### Calcul bénéfice par mois

Le responsable financier peut calculer le bénéfice du mois en entrant les dépenses dans le formulaire à droite.

![benefice](/assets/benefice.gif)

#### Valider paiements

Le responsable financier peut:

- voir la liste des paiement
- valider un paiement en cliquant sur le bouton `valider`

![valider-paiement](/assets/valider-paiement.gif)

## Team

- Abraham Ramilison
- Vonjitahina Ranjelison

## License

MIT © [Vonjy](https://github.com/vonjy55) & [Abraham](https://github.com/andrianoavy)
