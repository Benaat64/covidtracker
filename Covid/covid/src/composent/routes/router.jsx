import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../Homepage';
import Details from '../page/Details';

import Root from './root';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/details/:continentId',
        element: <Details />,
      },
    ],
  },
]);

export default router;
