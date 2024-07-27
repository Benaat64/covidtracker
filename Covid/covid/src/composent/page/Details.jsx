import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import CardCovid from '../CardCovid';

const Details = () => {
  const { continentId } = useParams();
  const { data, countries } = useOutletContext();

  //     Code origine : sans toLowerCase, pas d erreur mais page blanche. Avec erreur. Il faut donc controler la variable avant de la manipuler
  //   const sortedData = data
  //     .filter((item) => item.continent.toLowerCase() === continentId && item.country.toLowerCase() !== continentId)
  //     .sort((a, b) => b.deaths?.total - a.deaths?.total);

  let sortedData;

  if (continentId === 'all') {
    sortedData = data
      .filter((item) => {
        const continent = item.continent ? item.continent.toLowerCase() : '';
        const country = item.country ? item.country.toLowerCase() : '';

        return continent !== country;
      })
      .sort((a, b) => (b.deaths?.total || 0) - (a.deaths?.total || 0));
  } else {
    sortedData = data
      .filter((item) => {
        const continent = item.continent ? item.continent.toLowerCase() : '';
        const country = item.country ? item.country.toLowerCase() : '';

        return continent === continentId && country !== continentId;
      })
      .sort((a, b) => (b.deaths?.total || 0) - (a.deaths?.total || 0));
  }
  return (
    <div>
      <div className="flex justify-center flex-wrap">
        {sortedData.map((covid, index) => (
          <CardCovid key={index} covid={covid} countries={countries} />
        ))}
      </div>
    </div>
  );
};

export default Details;
