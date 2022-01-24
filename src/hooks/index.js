import {useState} from 'react';
import {
  assessAcc,
  assessInfo,
  login,
  header,
  headerInitState,
  primaryDialog,
  primaryDialogInitState,
  dialogPurchasing,
  dialogPurchasingInitState,
  toast,
  toastInitState,
  dialogItem,
  dialogItemInitState,
  secondaryDialog,
  secondaryDialogInitState,
  restock,
  restockInitState,
  searchHistory,
  searchHistoryInitState,
  reportBug,
  reportBugInitState,
  statistics,
  statisticsInitState,
  settings,
  settignsInitState,
  perishable,
  perishableInitState,
  dialogProduct,
  dialogProductInitState,
} from './reducers';

export {
  assessAcc,
  assessInfo,
  login,
  header,
  headerInitState,
  primaryDialog,
  primaryDialogInitState,
  dialogPurchasing,
  dialogPurchasingInitState,
  toast,
  toastInitState,
  dialogItem,
  dialogItemInitState,
  secondaryDialog,
  secondaryDialogInitState,
  restock,
  restockInitState,
  searchHistory,
  searchHistoryInitState,
  reportBug,
  reportBugInitState,
  statistics,
  statisticsInitState,
  settings,
  settignsInitState,
  perishable,
  perishableInitState,
  dialogProduct,
  dialogProductInitState,
};

export default function useHook(init, reducer) {
  const [state, setState] = useState(init);
  function dispatch(action) {
    const newState = reducer(state, action);
    setState(newState);
  }
  return [state, dispatch];
}
