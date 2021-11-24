import {createContext} from 'react';

const headerInitState = {
  title: '',
  isMenuListShow: false,
  onSetHeader: ({title, isMenuListShow}) => {},
};

const Header = createContext(headerInitState);

export default Header;
