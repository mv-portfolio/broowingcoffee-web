import SignIn from 'pages/SignIn';
import Dashboard from 'pages/Dashboard';
import PageNotExist from 'pages/PageNotExist';
import AssessmentAccount from 'pages/Assessment/Account';
import AssessmentInformation from 'pages/Assessment/Information';

import RouteAuth from 'components/RouteAuth';

const pages = [
  {
    isAuthRoute: false,
    path: '*',
    component: PageNotExist,
    exact: false,
    sensitive: true,
    strict: true,
  },
  {
    isAuthRoute: false,
    path: '/assessment-information',
    component: AssessmentInformation,
    exact: false,
    sensitive: true,
    strict: true,
  },
  {
    isAuthRoute: false,
    path: '/assessment-account',
    component: AssessmentAccount,
    exact: false,
    sensitive: true,
    strict: true,
  },
];

export {pages};
