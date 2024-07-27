import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../Homepage';
import Details from '../page/Details';

import Root from './root';

// On va avoir dans cette variable un tableau de routes (objets)

const router = createBrowserRouter([
  {
    element: <Root />, // L'élément commun à l'ensemble des pages sera l'élément Root
    children: [
      {
        path: '/',
        element: <Homepage />, // Pour chaque page l'élement de la page à récupérer
      },
      {
        path: '/details/:continentId',
        element: <Details />,
      },
      // {
      //   path: '/details/all',
      //   element: <All />,
      // },
    ],
  },
]);

export default router;
