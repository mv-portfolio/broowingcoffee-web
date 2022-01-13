import {createContext} from 'react';

const primaryDialogInitState = {
  onShow: (component, {disabledTouchOutside}) => {},
  onHide: () => {},
};

const PrimaryDialog = createContext(primaryDialogInitState);

export default PrimaryDialog;
