// src/components/Continent.jsx
import React from 'react';
import CardCategories from './CardCategories';

const Continent = ({ continentData }) => {
    if (!continentData || continentData.length === 0) {
        return null;
    }
console.log(continentData)
    return (
        <div className='flex flex-wrap justify-center '>
            {continentData.map((continent, index) => (
                <CardCategories key={index} covid={continent} />
            ))}
        </div>
    );
};

export default Continent;
