import {lazy, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {RouteAuth, RoutePrivate, Toast, PrimaryDialog, SecondaryDialog} from 'components';
import {APP_AUTH} from 'modules/actions';
import {pages} from './pages';
import {
  PrimaryDialog as PrimaryDialogContext,
  SecondaryDialog as SecondaryDialogContext,
  Toast as ToastContext,
} from 'context';
import useHook, {
  primaryDialog as primaryDialogReducer,
  primaryDialogInitState,
  secondaryDialog as secondaryDialogReducer,
  secondaryDialogInitState,
  toast as toastReducer,
  toastInitState,
} from 'hooks';

const DashboardNavigator = lazy(() => import('navigator/Dashboard'));
const SignIn = lazy(() => import('pages/SignIn'));

function RootNavigator({auth, history, error, dispatch}) {
  const toastInterval = useRef();
  const [primaryDialog, setPrimaryDialog] = useHook(
    primaryDialogInitState,
    primaryDialogReducer,
  );
  const [secondaryDialog, setSecondaryDialog] = useHook(
    secondaryDialogInitState,
    secondaryDialogReducer,
  );
  const [toast, setToast] = useHook(toastInitState, toastReducer);

  const onShowToast = (message, visibilityTime, callback) => {
    clearInterval(toastInterval.current);
    setToast({
      type: 'set',
      isVisible: true,
      message: message,
    });
    toastInterval.current = setInterval(() => {
      if (callback) callback();
      onHideToast();
    }, visibilityTime || 2000);
  };
  const onHideToast = () => {
    setToast({
      type: 'set',
      isVisible: false,
    });
    clearInterval(toastInterval.current);
  };

  const onShowSecondaryDialog = component => {
    setSecondaryDialog({
      type: 'set',
      visible: true,
      children: component,
    });
  };
  const onHideSecondaryDialog = () => {
    setSecondaryDialog({
      type: 'set',
      visible: false,
    });
  };

  const onShowPrimaryDialog = component => {
    setPrimaryDialog({
      type: 'set',
      visible: true,
      children: component,
    });
  };
  const onHidePrimaryDialog = () => {
    setPrimaryDialog({
      type: 'set',
      visible: false,
    });
  };

  useEffect(() => {
    dispatch(APP_AUTH());
  }, [dispatch]);

  return (
    <SecondaryDialogContext.Provider
      value={{onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog}}>
      <PrimaryDialogContext.Provider
        value={{onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog}}>
        <ToastContext.Provider value={{onShow: onShowToast, onHide: onHideToast}}>
          <ConnectedRouter history={history}>
            <Switch>
              <RouteAuth
                path='/'
                auth={auth}
                error={error}
                exact={auth.authenticated ? false : true}
                rederAuthComponent={DashboardNavigator}
                renderNonAuthComponent={SignIn}
              />
              {pages.map((page, index) => (
                <RoutePrivate key={index} auth={auth} error={error} {...page} />
              ))}
            </Switch>
            <SecondaryDialog {...secondaryDialog} />
            <PrimaryDialog {...primaryDialog} />
            <Toast {...toast} />
          </ConnectedRouter>
        </ToastContext.Provider>
      </PrimaryDialogContext.Provider>
    </SecondaryDialogContext.Provider>
  );
}

const stateProps = ({auth, error}) => ({
  auth,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(RootNavigator);
