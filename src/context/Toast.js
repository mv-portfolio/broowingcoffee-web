const {createContext} = require('react');

export const toastInitState = {
  isVisible: false,
  onShow: (message, visibilityTime) => {},
  onHide: () => {},
};

const Toast = createContext(toastInitState);

export default Toast;
