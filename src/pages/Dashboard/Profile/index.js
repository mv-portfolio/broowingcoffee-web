import {Button, Icon, Separator, Text, View} from 'components';
import {BUILD_STATE, VERSION} from 'config/env';
import {replace} from 'connected-react-router';
import {connect} from 'react-redux';
import {popLocalStorage} from 'storage';
import Formatter from 'utils/Formatter';

import styles from './.module.css';
import modules from './modules';

function Profile({user, dispatch}) {
  const {firstname, lastname, username} = user;

  const onPress = actionType => {
    if (actionType === 'Settings') {
      return;
    }
    if (actionType === 'About') {
      return;
    }
    if (actionType === 'Report') {
      return;
    }
    if (actionType === 'Sign out') {
      popLocalStorage('sat');
      dispatch(replace('/'));
      window.location.reload();
      return;
    }
  };

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
        <Text style={styles.configText}>{`${BUILD_STATE} | ${VERSION}`}</Text>
      </View>
    </View>
  );
}

const stateProps = ({user}) => ({user});
const dispatchProps = dispatch => ({dispatch: action => dispatch(action)});

export default connect(stateProps, dispatchProps)(Profile);
