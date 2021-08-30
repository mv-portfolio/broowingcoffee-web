import {useEffect} from 'react';
import {Provider} from 'react-redux';
import configStore, {history} from 'modules';
import {PrimaryDialog as PrimaryDialogContext} from 'context';
import RootNavigator from 'navigator/Root';
import useHook, {primaryDialog, primaryDialogInitState} from 'hooks';
import PrimaryDialog from 'components/PrimaryDialog';
import {ConfigInterceptor} from 'network/api/server';
export default function App() {
  const [dialog, setDialog] = useHook(primaryDialogInitState, primaryDialog);

  const store = configStore();
  ConfigInterceptor(store);

  const onShow = component => {
    setDialog({
      type: 'set',
      visible: true,
      children: component,
    });
  };

  const onHide = () => {
    setDialog({
      type: 'set',
      visible: false,
    });
  };

  const otherListeners = () => {
    const viewHeight = window.innerHeight;
    const metaViewport = document.querySelector('meta[name=viewport]');
    const onResize = () => {
      if (viewHeight !== window.innerHeight) {
        metaViewport.setAttribute(
          'content',
          `height=${viewHeight}, width=device-width, initial-scale=1.0`,
        );
        return;
      }
      metaViewport.setAttribute(
        'content',
        `width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1`,
      );
    };

    window.addEventListener('resize', onResize);
  };

  useEffect(otherListeners, []);

  return (
    <Provider store={store}>
      <PrimaryDialogContext.Provider value={{onShow, onHide}}>
        <RootNavigator history={history} />
        <PrimaryDialog onTouchOutside={onHide} {...dialog} />
      </PrimaryDialogContext.Provider>
    </Provider>
  );
}
