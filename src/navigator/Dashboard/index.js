import {lazy, useContext, useEffect, useReducer} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Icon from 'react-web-vector-icons';

import {Button, Dialog, View} from 'components';
import {WHITE} from 'constants/colors';
import {PEEK_INVENTORY, PEEK_PRODUCTS, RESET_SESSION} from 'ducks/actions';
import {Header, PrimaryDialog} from 'context';
import {pages} from './pages';
import styles from './.module.css';

const HeaderBar = lazy(() => import('components/HeaderBar'));

function DashBoardNavigator({dispatch, user, error}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);

  const {title, isMenuListShow, onSetHeader} = useContext(Header);

  const onClick = (componentType, value) => {
    if (componentType === 'switch-route') {
      onSetHeader({isMenuListShow: false, title: value});
    } else if (componentType === 'menu') {
      onSetHeader({isMenuListShow: !isMenuListShow});
    } else if (componentType === 'menu-touch-outside') {
      onSetHeader({isMenuListShow: false});
    }
  };

  const initListener = () => {
    dispatch(PEEK_PRODUCTS());
    dispatch(PEEK_INVENTORY());
  };
  const errorListener = () => {
    if (error.auth === 'jwt expired') {
      onShowPrimaryDialog(
        <Dialog
          title='Session Expired'
          content='We need to redirect you from login'
          onClickPositive={() => {
            dispatch(RESET_SESSION());
            onSetHeader({type: 'clear'});
            onHidePrimaryDialog();
          }}
        />,
      );
    }
  };

  useEffect(initListener, [dispatch]);
  useEffect(errorListener, [error, dispatch]);

  return (
    <View style={styles.mainPane}>
      {user.isAssessed && (
        <HeaderBar
          title={title}
          showMenu={isMenuListShow}
          onSwitchRoute={routeName => onClick('switch-route', routeName)}
          prefixComponent={
            <Button onPress={() => onClick('menu')}>
              <Icon font='Feather' name='menu' size={`3.5vh`} color={WHITE} />
            </Button>
          }
        />
      )}
      <View style={styles.contentPane}>
        {isMenuListShow && (
          <Button
            title=''
            onPress={() => onClick('menu-touch-outside')}
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

const stateProps = ({user, error}) => ({user, error});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(DashBoardNavigator);
