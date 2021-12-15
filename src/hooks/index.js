import {useState} from 'react';
import {
  assessAcc,
  assessInfo,
  login,
  header,
  headerInitState,
  primaryDialog,
  primaryDialogInitState,
  purchasingProduct,
  purchasingProductInitState,
  toast,
  toastInitState,
  productAddons,
  productAddonsInitState,
  productMain,
  productMainInitState,
  products,
  productsInitState,
  item,
  itemInitState,
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
} from './reducers';

export {
  assessAcc,
  assessInfo,
  login,
  header,
  headerInitState,
  primaryDialog,
  primaryDialogInitState,
  purchasingProduct,
  purchasingProductInitState,
  toast,
  toastInitState,
  productAddons,
  productAddonsInitState,
  productMain,
  productMainInitState,
  products,
  productsInitState,
  item,
  itemInitState,
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
};

export default function useHook(init, reducer) {
  const [state, setState] = useState(init);
  function dispatch(action) {
    const newState = reducer(state, action);
    setState(newState);
  }
  return [state, dispatch];
}
