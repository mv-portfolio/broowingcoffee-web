import { useState } from 'react';

export default function useHook(init, reducer) {
  const [state, setState] = useState(init);
  function dispatch(action) {
    const newState = reducer(state, action);
    setState(newState);
  }
  return [state, dispatch];
}
