// src/contexts/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCovidData = async () => {
            try {
                const response = await fetch('https://covid-193.p.rapidapi.com/statistics', {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
                        'x-rapidapi-key': 'YOUR_API_KEY'
                    }
                });
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
        <DataContext.Provider value={{ data, countries }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
