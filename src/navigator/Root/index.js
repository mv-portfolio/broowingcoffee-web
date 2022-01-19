import {lazy, useRef, useEffect, useReducer} from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {RouteAuth, RoutePrivate, Toast, PrimaryDialog, SecondaryDialog} from 'components';
import {APP_AUTH} from 'ducks/actions';
import {pages} from './pages';
import {
  PrimaryDialog as PrimaryDialogContext,
  SecondaryDialog as SecondaryDialogContext,
  Toast as ToastContext,
  Header as HeaderContent,
} from 'context';
import useHook, {
  primaryDialog as primaryDialogReducer,
  primaryDialogInitState,
  secondaryDialog as secondaryDialogReducer,
  secondaryDialogInitState,
  toast as toastReducer,
  toastInitState,
  header as headerReducer,
  headerInitState,
} from 'hooks';
import {peekLocalStorage, pushLocalStorage} from 'storage';

const DashboardNavigator = lazy(() => import('navigator/Dashboard'));
const SignIn = lazy(() => import('pages/SignIn'));

function RootNavigator({auth, history, error, dispatch}) {
  const [primaryDialog, setPrimaryDialog] = useReducer(
    primaryDialogReducer,
    primaryDialogInitState,
  );
  const [secondaryDialog, setSecondaryDialog] = useReducer(
    secondaryDialogReducer,
    secondaryDialogInitState,
  );
  const [header, setHeader] = useReducer(headerReducer, headerInitState);
  const [toast, setToast] = useReducer(toastReducer, toastInitState);

  const toastInterval = useRef();

  const onSetHeader = ({title, isMenuListShow, ...props}) => {
    setHeader({type: 'set', title, isMenuListShow, ...props});
  };

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

  const onShowSecondaryDialog = (component, props) => {
    setSecondaryDialog({
      type: 'set',
      visible: true,
      children: component,
      ...props,
    });
  };
  const onHideSecondaryDialog = () => {
    setSecondaryDialog({
      type: 'set',
      visible: false,
      disabledTouchOutside: true,
    });
  };

  const onShowPrimaryDialog = (component, props) => {
    setPrimaryDialog({
      type: 'set',
      visible: true,
      children: component,
      ...props,
    });
  };
  const onHidePrimaryDialog = () => {
    setPrimaryDialog({
      type: 'set',
      visible: false,
      disabledTouchOutside: true,
    });
  };

  const screenInitListener = () => {
    dispatch(APP_AUTH());
    if (!peekLocalStorage('cfg')) {
      pushLocalStorage('cfg', {
        'always show details product': false,
      });
    }
  };
  useEffect(screenInitListener, [dispatch]);

  return (
    <HeaderContent.Provider
      value={{title: header.title, isMenuListShow: header.isMenuListShow, onSetHeader}}>
      <SecondaryDialogContext.Provider
        value={{
          onShow: onShowSecondaryDialog,
          onHide: onHideSecondaryDialog,
          setConfig: setSecondaryDialog,
        }}>
        <PrimaryDialogContext.Provider
          value={{
            onShow: onShowPrimaryDialog,
            onHide: onHidePrimaryDialog,
            setConfig: setPrimaryDialog,
          }}>
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
              <SecondaryDialog
                {...secondaryDialog}
                onTouchOutside={onHideSecondaryDialog}
              />
              <PrimaryDialog {...primaryDialog} onTouchOutside={onHidePrimaryDialog} />
              <Toast {...toast} />
            </ConnectedRouter>
          </ToastContext.Provider>
        </PrimaryDialogContext.Provider>
      </SecondaryDialogContext.Provider>
    </HeaderContent.Provider>
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
