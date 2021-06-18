import {lazy} from 'react';

const PageNotExist = lazy(() => import('pages/PageNotExist'));
const AssessmentInformation = lazy(() =>
  import('pages/Assessment/Information'),
);
const AssessmentAccount = lazy(() => import('pages/Assessment/Account'));

const pages = [
  {
    path: '/assessment/information/:token',
    component: AssessmentInformation,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/assessment/account/:token',
    component: AssessmentAccount,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '*',
    component: PageNotExist,
    sensitive: true,
    strict: true,
  },
];

export {pages};
