import {lazy} from 'react';

const Transaction = lazy(() => import('pages/Dashboard/Transaction'));
const Reports = lazy(() => import('pages/Dashboard/Reports'));
const Inventory = lazy(() => import('pages/Dashboard/Inventory'));
const Products = lazy(() => import('pages/Dashboard/Products'));
const Statistics = lazy(() => import('pages/Dashboard/Statistics'));
const Profile = lazy(() => import('pages/Dashboard/Profile'));
const PageError = lazy(() => import('pages/PageError'));

const AssessmentInformation = lazy(() => import('pages/Assessment/Information'));
const AssessmentAccount = lazy(() => import('pages/Assessment/Account'));

const pages = [
  {
    path: '/',
    component: Transaction,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/reports',
    component: Reports,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/inventory',
    component: Inventory,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/products',
    component: Products,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/statistics',
    component: Statistics,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/profile',
    component: Profile,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/assessment/information',
    component: AssessmentInformation,
    exact: true,
    sensitive: true,
    strict: true,
  },
  {
    path: '/assessment/account',
    component: AssessmentAccount,
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
