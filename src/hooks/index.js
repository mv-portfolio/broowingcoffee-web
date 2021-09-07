import {useState} from 'react';
import {
  assessAcc,
  assessInfo,
  login,
  menu,
  initStateMenu,
  primaryDialog,
  primaryDialogInitState,
  purchasingProduct,
  purchasingProductInitState,
} from './reducers';

export {
  assessAcc,
  assessInfo,
  login,
  menu,
  initStateMenu,
  primaryDialog,
  primaryDialogInitState,
  purchasingProduct,
  purchasingProductInitState,
};

export default function useHook(init, reducer) {
  const [state, setState] = useState(init);
  function dispatch(action) {
    const newState = reducer(state, action);
    setState(newState);
  }
  return [state, dispatch];
}
