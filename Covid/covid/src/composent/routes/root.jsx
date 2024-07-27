import React, { useEffect, useState } from 'react';

import Header from '../page/Header';
import { Outlet } from 'react-router-dom';

// React.createElement()

// > Pour changer le render d'une App React, je passe par un state. En React, on change la valeur du state et React s'occupe de re-rendre les composants
// > Pour passer des variables à des composants JSX, je passe par des props (pseudo attributs HTML)

export default function Root() {
  // ici on stocke les pizzas. On utilise un state qui va piloter l'affichage de la liste de pizzas. Dès que le tableau sera modifié, la liste html sera réactualisée automatiquement
  // useState([]) => valeur de départ du state (tableau vide)
  // JS : useState([])
  // TS : useState<IPizza[]>([]) : le type de cet élément contiendra un tableau de Pizza
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const response = await fetch(
          'https://covid-193.p.rapidapi.com/statistics',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'covid-193.p.rapidapi.com',
              'x-rapidapi-key':
                '218e3a2ed1msh7ab27ccd287c822p18298djsn00b708633176',
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.response || []);
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
      }
    };

    const fetchCountryFlags = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCountries(result);
      } catch (error) {
        console.error('Erreur lors de la requête des pays:', error);
      }
    };

    fetchCovidData();
    fetchCountryFlags();
  }, []);

  return (
    <div className="app">
      <Header data={data} />
      {/* On enlève le homepage, pour le remplacer par quoi ? */}
      {/* L'élément Outlet qui provient de react-router-dom et qui sera remplacé par le composant de la page courante */}

      {/* Dans outlet, on peut passer une prop qui s'appelle context. L'avantage de l'avoir ici, c'est que je vais gérer un état centralisé */}
      <Outlet context={{ data, setData, countries, setCountries }} />
    </div>
  );
}
