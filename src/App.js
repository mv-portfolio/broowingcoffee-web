import {useEffect} from 'react';
import {Provider} from 'react-redux';
import configStore, {history} from 'modules';
import RootNavigator from 'navigator/Root';
import {ConfigInterceptor} from 'network/api/server';

export default function App() {
  const store = configStore();
  ConfigInterceptor(store);

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
      <RootNavigator history={history} />
    </Provider>
  );
}
