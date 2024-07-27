import React, { useEffect, useState } from 'react';
import CardCovid from './CardCovid';

const Container = () => {
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

  const groupedByContinent = data.reduce((acc, item) => {
    const { continent } = item;
    if (!acc[continent]) {
      acc[continent] = [];
    }
    acc[continent].push(item);
    return acc;
  }, {});

  return (
    <div className="container p-8 bg-gray-100 w-full">
      {Object.keys(groupedByContinent).map((continent) => (
        <div key={continent} className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-black text-center">
            {continent || 'Unknown Continent'}
          </h1>
          <div className="flex flex-wrap justify-center">
            {groupedByContinent[continent].map((covid, index) => (
              <CardCovid key={index} covid={covid} countries={countries} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Container;
