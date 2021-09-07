import {lazy} from 'react';

import {Circle, CircleSnail} from './Progress';

const Button = lazy(() => import('./Button'));
const Checklist = lazy(() => import('./Checklist'));
const Image = lazy(() => import('./Image'));
const Picker = lazy(() => import('./Picker'));
const Separator = lazy(() => import('./Separator'));
const TextInput = lazy(() => import('./TextInput'));
const Text = lazy(() => import('./Text'));
const View = lazy(() => import('./View'));
const RouteAuth = lazy(() => import('./RouteAuth'));
const RoutePrivate = lazy(() => import('./RoutePrivate'));
const PrimaryDialog = lazy(() => import('./PrimaryDialog'));
const Icon = lazy(() => import('./Icon'));
const Toast = lazy(() => import('./Toast'));

export {
  Button,
  Checklist,
  Circle,
  CircleSnail,
  Image,
  Picker,
  Separator,
  TextInput,
  Text,
  View,
  RouteAuth,
  RoutePrivate,
  PrimaryDialog,
  Icon,
  Toast,
};
