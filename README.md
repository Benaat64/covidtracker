# Covid Tracker Project

## Description

Pendant mes cours, j'ai pris l'initiative de réaliser ce projet pour découvrir et pratiquer React, Tailwind CSS et JSX. J'ai utilisé deux API : une pour obtenir des données sur le Covid et une pour afficher les drapeaux (c'est pourquoi certains drapeaux peuvent ne pas apparaître).

Démo du project :  [ici](https://covidtracker-pi.vercel.app).

## Fonctionnalités

- Affichage des données Covid par continent et par pays.
- Utilisation de deux API :
  - API Covid pour obtenir les données des cas, décès, et autres statistiques.
  - API des drapeaux pour afficher les drapeaux des pays.
- Utilisation de React Router pour la navigation entre les pages.
- Interface utilisateur construite avec Tailwind CSS pour une mise en page rapide et réactive.

## Technologies utilisées

- **React** : Pour la construction de l'interface utilisateur.
- **Vite** : Pour le bundling et le développement rapide.
- **Tailwind CSS** : Pour le style et la mise en page.
- **JSX** : Pour écrire des éléments React de manière expressive.
- **React Router** : Pour la gestion de la navigation.

## Points à améliorer

- Créer des sessions pour pouvoir mettre les pays en favoris.
- Ajouter une section Favoris pour accéder rapidement aux pays favoris.
- Améliorer l'organisation des fichiers pour une meilleure structure du projet.

## Utilisation des Hooks

- **useState** : Pour gérer l'état local dans les composants.
- **useEffect** : Pour effectuer des opérations secondaires dans les composants, comme les appels API.
- **React Router** : Pour la navigation entre les pages.

## Installation et démarrage

Pour exécuter ce projet localement, suivez ces étapes :

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/Benaat64/covidtracker.git
    ```
2. Installez les dépendances :
   ```sh
   npm install
    ```
3. Insérez votre propre clé d'API dans le fichier `/routes/root` à la ligne 28. Vous pouvez obtenir une clé d'API sur [RapidAPI](https://rapidapi.com/api-sports/api/covid-193).


4. Démarrez le serveur de développement :
   ```sh
   npm run dev
    ```

Le projet sera alors disponible à l'adresse http://localhost:5173.

## Remarque
- Certains drapeaux peuvent ne pas apparaître en raison de limitations de l'API des drapeaux utilisée.
- Le projet est conçu pour être un exercice de pratique et d'apprentissage des technologies mentionnées ci-dessus.

## Auteur
Réalisé par [Benaat64](https://github.com/Benaat64).

