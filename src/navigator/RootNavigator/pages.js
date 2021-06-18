import {lazy} from 'react';

const PageNotExist = lazy(() => import('pages/PageNotExist'));
const AssessmentInformation = lazy(() =>
  import('pages/Assessment/Information'),
);
const AssessmentAccount = lazy(() => import('pages/Assessment/Account'));
const PageError = lazy(()=>  import('pages/PageError'))

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
  // {
  //   path: '/error',
  //   component: PageError,
  //   exact: true,
  //   sensitive: true,
  //   strict: true,
  // },
  {
    path: '*',
    component: PageNotExist,
    exact: true,
    sensitive: true,
    strict: true,
  },
];

export {pages};
