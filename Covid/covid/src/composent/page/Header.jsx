import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ data }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  if (!data || data.length === 0) {
    return <div className="text-center py-4">Loading...</div>;
  }

  // Créer un objet pour stocker les décès totaux par continent
  const deathsByContinent = data.reduce((acc, item) => {
    if (item.continent && item.deaths && item.deaths.total) {
      const continent = item.continent;
      const deaths = item.deaths.total;

      if (!acc[continent]) {
        acc[continent] = 0;
      }

      acc[continent] += deaths;
    }
    return acc;
  }, {});

  // Créer un tableau des continents avec les décès totaux
  const continentsWithDeaths = Object.keys(deathsByContinent).map(
    (continent) => ({
      name: continent,
      deaths: deathsByContinent[continent],
    })
  );

  const sortedContinents = continentsWithDeaths.sort(
    (a, b) => b.deaths - a.deaths
  );

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <header className="bg-gray-800 md:mb-10 mb-0 text-white shadow-md">
      <nav
        className={`container mx-auto flex items-center justify-between p-4 ${isNavVisible ? 'flex-col' : ''}`}
      >
        <div className="text-2xl font-semibold">
          <NavLink to="/" className="hover:text-gray-400">
            CovidTracker
          </NavLink>
        </div>

        <div className="flex md:hidden">
          <button
            onClick={toggleNavVisibility}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`md:flex space-x-4 ${isNavVisible ? 'flex  flex-col items-center' : 'hidden'} md:block`}
        >
          {sortedContinents.map((continent, index) => (
            <NavLink
              key={index}
              to={`/details/${continent.name.toLowerCase()}`}
              className="px-3 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
              activeClassName="bg-gray-600"
              onClick={() => setIsNavVisible(false)}
            >
              {continent.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
