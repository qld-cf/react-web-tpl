
import React from 'react';
const Settlement = React.lazy(() => import('@views/settlement/Settlement'));

const routes = [
  {
    path: '/home',
    component: Settlement
  },
  {
    path: '/settlement',
    component: Settlement
  }
];
export default routes;
