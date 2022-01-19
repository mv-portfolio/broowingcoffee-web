import {createContext} from 'react';

const secondaryDialogInitState = {
  onShow: (component, {disabledTouchOutside}) => {},
  onHide: () => {},
  setConfig: () => {}
};

const SecondaryDialog = createContext(secondaryDialogInitState);

export default SecondaryDialog;
