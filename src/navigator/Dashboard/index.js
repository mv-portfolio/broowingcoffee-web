import Icon from 'react-web-vector-icons';
import styles from './.module.css';

import {lazy} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Button, View} from 'components';
import {pages} from './pages';
import {WHITE} from 'constants/styles';
import {connect} from 'react-redux';
import useHook, {menu, initStateMenu} from 'hooks';

const HeaderBar = lazy(() => import('components/HeaderBar'));

function DashBoardNavigator({user}) {
  const [menuState, setMenuState] = useHook(initStateMenu, menu);

  const onClick = (componentType, value) => {
    if (componentType === 'switch-route') {
      setMenuState({type: 'set', title: value, isShow: false});
    } else if (componentType === 'menu') {
      setMenuState({type: 'set-show', isShow: !menuState.isShow});
    } else if (componentType === 'menu-touch-outside') {
      setMenuState({type: 'set-show', isShow: false});
    }
  };

  return (
    <View style={styles.mainPane}>
      {user.isAssessed && (
        <HeaderBar
          title={menuState.title}
          showMenu={menuState.isShow}
          onSwitchRoute={routeName => onClick('switch-route', routeName)}
          prefixComponent={
            <Button onPress={() => onClick('menu')}>
              <Icon font='Feather' name='menu' size={`3.5vh`} color={WHITE} />
            </Button>
          }
        />
      )}
      <View style={styles.contentPane}>
        {menuState.isShow && (
          <Button
            onPress={() => onClick('menu-touch-outside')}
            title=''
            skin={styles.touchableOutside}
          />
        )}
        <Switch>
          {pages.map((page, index) => (
            <Route key={index} {...page} />
          ))}
        </Switch>
      </View>
    </View>
  );
}

const stateProps = ({user}) => ({user});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(DashBoardNavigator);
