import React from 'react';

const continentColors = {
  Europe: '#4A90E2',
  Africa: '#964B00',
  Asia: '#F44336',
  Oceania: '#00BCD4',
  'South-America': '#FF9800',
  'North-America': '#9C27B0',
};

const CardCovid = ({ covid, countries }) => {
  const continentColor = continentColors[covid.continent] || '#2E8B57';

  const country = countries.find(
    (country) => country.name.common === covid.country
  );
  const flagUrl = country?.flags?.svg;

  return (
    <div className="p-4 m-2 border rounded shadow-md bg-white w-full sm:w-1/2 md:w-1/4 transition-transform transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">
        {covid.country || 'N/A'}
      </h2>
      {flagUrl && (
        <img
          src={flagUrl}
          alt={`${covid.country} flag`}
          className="w-12 h-8 my-2 m-auto"
        />
      )}
      <p className="text-gray-700 text-center">
        Continent:{' '}
        <span style={{ color: continentColor }}>
          {covid.continent || 'N/A'}
        </span>
      </p>
      <p className="text-teal-500 text-center">
        Population: {covid.population?.toLocaleString() || 'N/A'}{' '}
      </p>
      <p className="text-gray-700 text-center">
        Cas Confirmés:{' '}
        <span className="text-green-500">
          {covid.cases?.total.toLocaleString() || 'N/A'}
        </span>
      </p>
      <p className="text-gray-700 text-center">
        Décès:{' '}
        <span className="text-red-500 font-extrabold">
          {Number.isFinite(covid.deaths?.total)
            ? covid.deaths.total.toLocaleString()
            : 'N/A'}
        </span>
      </p>
    </div>
  );
};

export default CardCovid;
