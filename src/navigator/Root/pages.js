import {lazy} from 'react';

const PageError = lazy(() => import('pages/PageError'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword'));

const pages = [
  {
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '*',
    component: PageError,
    sensitive: true,
    strict: true,
  },
];

export {pages};
