import React from 'react';
import { NavLink } from 'react-router-dom';

const continentColors = {
  Europe: '#4A90E2',
  Africa: '#964B00',
  Asia: '#F44336',
  Oceania: '#00BCD4',
  'South-America': '#FF9800',
  'North-America': '#9C27B0',
};

const CardCategories = ({ covid }) => {
  if (!covid) {
    return <div>Loading ...</div>;
  }

  const continentColor = continentColors[covid.continent] || '#2E8B57';

  return (
    <NavLink
      to={`/details/${covid.country.toLowerCase()}`}
      className="p-4 m-2 border rounded shadow-md bg-white w-full sm:w-1/2 md:w-1/4 transition-transform transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
      style={{ borderColor: continentColor }}
    >
      <h2
        className="text-2xl font-bold mb-4 text-black text-center"
        style={{ color: continentColor }}
      >
        {covid.country || 'N/A'}
      </h2>
      <p className="text-gray-700 text-center">
        Cas Confirmés:{' '}
        <span className="text-green-500">
          {covid.cases?.total.toLocaleString() || 'N/A'}
        </span>
      </p>
      <p className="text-gray-700 text-center">
        Décès:{' '}
        <span className="text-red-500">
          {Number.isFinite(covid.deaths?.total)
            ? covid.deaths.total.toLocaleString()
            : 'N/A'}
        </span>
      </p>
    </NavLink>
  );
};

export default CardCategories;
