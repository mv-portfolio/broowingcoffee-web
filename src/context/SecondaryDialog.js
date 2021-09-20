import {createContext} from 'react';

const secondaryDialogInitState = {
  onShow: () => {},
  onHide: () => {},
};

const SecondaryDialog = createContext(secondaryDialogInitState);

export default SecondaryDialog;
