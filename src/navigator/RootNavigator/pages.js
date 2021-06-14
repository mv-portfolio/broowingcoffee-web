import PageNotExist from 'pages/PageNotExist';
import AssessmentAccount from 'pages/Assessment/Account';
import AssessmentInformation from 'pages/Assessment/Information';

const pages = [
  {
    path: '*',
    component: PageNotExist,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/assessment-information',
    component: AssessmentInformation,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/assessment-account',
    component: AssessmentAccount,
    exact: true,
    sensitive: true,
    strict: true,
  },
];

export {pages};
