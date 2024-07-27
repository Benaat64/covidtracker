import React, { useEffect, useState } from 'react';
import Monde from './Monde';
import Continent from './Continent';

const Homepage = () => {
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

  const mondeData = data.find((country) => country.country === 'All');

  // Trouver les données de chaque continent
  const continentNames = [
    'Europe',
    'Africa',
    'Asia',
    'Oceania',
    'South-America',
    'North-America',
  ];
  const continentData = continentNames
    .map((name) => data.find((item) => item.country === name))
    .sort((a, b) => b.deaths?.total - a.deaths?.total);

  return (
    <div className="w-full">
      <Monde covid={mondeData} />
      <Continent continentData={continentData} />
    </div>
  );
};

export default Homepage;
