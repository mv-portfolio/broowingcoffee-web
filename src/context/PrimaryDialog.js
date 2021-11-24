import {createContext} from 'react';

const primaryDialogInitState = {
  onShow: (component, props) => {},
  onHide: () => {},
};

const PrimaryDialog = createContext(primaryDialogInitState);

export default PrimaryDialog;
