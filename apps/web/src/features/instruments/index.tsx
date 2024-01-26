/* eslint-disable perfectionist/sort-objects */

import type { RouteObject } from 'react-router-dom';

import { AvailableInstrumentsPage } from './pages/AvailableInstrumentsPage';
import { InstrumentRenderPage } from './pages/InstrumentRenderPage';
import { ManageInstrumentsPage } from './pages/ManageInstrumentsPage';

export const instrumentsRoute: RouteObject = {
  path: 'instruments',
  children: [
    {
      path: 'manage-instruments',
      element: <ManageInstrumentsPage />
    },
    {
      path: 'available-instruments',
      element: <AvailableInstrumentsPage />
    },
    {
      path: 'render/:id',
      element: <InstrumentRenderPage />
    }
  ]
};
