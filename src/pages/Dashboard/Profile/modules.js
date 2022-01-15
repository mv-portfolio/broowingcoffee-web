import {ACCENT_COLOR2} from 'constants/colors';
import {WHITE} from 'constants/colors';

const modules = [
  {
    title: 'Settings',
    theme: WHITE,
    icon: {
      font: 'Feather',
      name: 'settings',
    },
  },
  {
    title: 'About',
    theme: WHITE,
    icon: {
      font: 'Feather',
      name: 'info',
    },
  },
  {
    title: 'Report',
    theme: WHITE,
    icon: {
      font: 'AntDesign',
      name: 'warning',
    },
  },
  {
    title: 'Contact us',
    theme: WHITE,
    icon: {
      font: 'Feather',
      name: 'mail',
    },
  },
  {
    title: 'Sign out',
    theme: ACCENT_COLOR2,
    icon: {
      font: 'AntDesign',
      name: 'logout',
    },
  },
];

export default modules;
