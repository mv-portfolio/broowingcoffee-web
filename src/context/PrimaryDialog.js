import {createContext} from 'react';

const primaryDialogInitState = {
  onShow: (component, {disabledTouchOutside}) => {},
  onHide: () => {},
  setConfig: () => {},
};

const PrimaryDialog = createContext(primaryDialogInitState);

export default PrimaryDialog;
