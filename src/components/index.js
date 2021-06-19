import {lazy} from 'react';
import {wp, hp} from './Responsive';

import {Circle, CircleSnail} from './Progress';

const Button = lazy(() => import('./Button'));
const Image = lazy(() => import('./Image'));
const Separator = lazy(() => import('./Separator'));
const TextInput = lazy(() => import('./TextInput'));
const Text = lazy(() => import('./Text'));
const View = lazy(() => import('./View'));
const RouteAuth = lazy(() => import('./RouteAuth'));
const RoutePrivate = lazy(() => import('./RoutePrivate'));

export {
  Button,
  Circle,
  CircleSnail,
  hp,
  wp,
  Image,
  Separator,
  TextInput,
  Text,
  View,
  RouteAuth,
  RoutePrivate,
};
