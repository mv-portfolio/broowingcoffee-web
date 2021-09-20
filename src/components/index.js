import {lazy} from 'react';

import {Circle, CircleSnail} from './Progress';

const Button = lazy(() => import('./Button'));
const Checklist = lazy(() => import('./Checklist'));
const Dialog = lazy(() => import('./Dialog'));
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
const SearchField = lazy(() => import('./SearchField'));
const SecondaryDialog = lazy(() => import('./SecondaryDialog'));

export {
  Button,
  Checklist,
  Circle,
  CircleSnail,
  Dialog,
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
  SearchField,
  SecondaryDialog
};
