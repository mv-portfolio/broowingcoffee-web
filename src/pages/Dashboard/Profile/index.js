import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {popLocalStorage} from 'storage';
import {Button, Dialog, Icon, Separator, Text, View} from 'components';
import {ENV, VERSION} from 'config/env';
import {CLEAR_LOADING, RESET_SESSION} from 'modules/actions';
import {PrimaryDialog} from 'context';
import Formatter from 'utils/Formatter';

import ReportBug from './modals/ReportBug';
import styles from './.module.css';
import modules from './modules';

function Profile({user, loading, dispatch}) {
  const {firstname, lastname, username} = user;
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);

  const onPress = action => {
    if (action === 'Settings') {
      return;
    }
    if (action === 'About') {
      return;
    }
    if (action === 'Report') {
      onShowPrimaryDialog(<ReportBug />, {disabledTouchOutside: false});
      return;
    }
    if (action === 'Sign out') {
      popLocalStorage('sat');
      dispatch(RESET_SESSION());
      return;
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Profile';

    return () => {
      dispatch(CLEAR_LOADING());
    };
  };
  const loadingListener = () => {
    if (!loading.status) {
      onHidePrimaryDialog();
      if (loading.message.includes('report')) {
        onShowPrimaryDialog(
          <Dialog
            title='Success'
            content={loading.message}
            positiveText='Okay'
            onClickPositive={() => onHidePrimaryDialog()}
          />,
          {disabledTouchOutside: false},
        );
      }
    }
  };
  useEffect(loadingListener, [loading]);
  useEffect(screenInitListener, []);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.backdrop} />
        <View style={styles.picturePane}></View>
        <Separator vertical={2} />
        <Text style={styles.title}>{Formatter.toName(`${firstname} ${lastname}`)}</Text>
        <Text style={styles.subtitle}>{username}</Text>
      </View>
      <View style={styles.bodyPane}>
        {modules.map((item, index) => (
          <View key={index}>
            <Button
              onPress={() => onPress(item.title)}
              titleStyle={
                item.title !== 'Sign out' ? styles.buttonText : styles.buttonTextSpecial
              }
              skin={styles.button}
              prefixComponent={<Icon {...item.icon} color={item.theme} size='2.25vh' />}
              {...item}
            />
            {index + 1 !== modules.length ? (
              <Separator borderColor='rgba(100, 100, 100, 0.5)' borderWidth='0.025vh' />
            ) : null}
          </View>
        ))}
      </View>
      <View style={styles.bottomPane}>
        <Text style={styles.configText}>{`${ENV} | ${VERSION}`}</Text>
      </View>
    </View>
  );
}

const stateProps = ({user, loading}) => ({user, loading});
const dispatchProps = dispatch => ({dispatch: action => dispatch(action)});

export default connect(stateProps, dispatchProps)(Profile);
