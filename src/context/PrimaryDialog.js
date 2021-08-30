const {createContext} = require('react');

const primaryDialogInitState = {
  onShow: () => {},
  onHide: () => {},
};

const PrimaryDialog = createContext(primaryDialogInitState);

export default PrimaryDialog;
