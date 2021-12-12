import {useEffect} from 'react';
import {Provider} from 'react-redux';
import configStore, {history} from 'ducks';
import RootNavigator from 'navigator/Root';
import {ConfigInterceptor} from 'network/api/server';

export default function App() {
  const store = configStore();
  ConfigInterceptor(store);

  const screenInit = () => {
    if (process.env.NODE_ENV !== 'development') {
      console.log = function () {};
    }

    const viewHeight = window.innerHeight;
    const metaViewport = document.querySelector('meta[name=viewport]');
    const onResize = () => {
      if (viewHeight !== window.innerHeight) {
        metaViewport.setAttribute(
          'content',
          `height=${viewHeight}, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1`,
        );
        return;
      }
      metaViewport.setAttribute(
        'content',
        `height=device-height, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1`,
      );
    };

    window.addEventListener('resize', onResize);
  };
  useEffect(screenInit, []);

  return (
    <Provider store={store}>
      <RootNavigator history={history} />
    </Provider>
  );
}
