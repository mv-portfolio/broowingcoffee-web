import Icon from 'react-web-vector-icons';
import useHook from 'hooks/local';
import styles from './.module.css';

import {useEffect} from 'react';
import {connect} from 'react-redux';
import {accAssessReducer} from 'hooks/local/reducers';
import {logo} from 'assets/icons';
import {accentColor} from 'constants/styles';
import {ICON_SIZE} from 'constants/sizes';
import {ASSESSMENT_ACCOUNT} from 'constants/strings';
import {SET_FORGOTPASSWOROD} from 'hooks/global/redux/actions';
import {Image, Text, Separator, TextInput, View, Button} from 'components';

function Account({dispatch}) {
  const [state, setState] = useHook(ASSESSMENT_ACCOUNT, accAssessReducer);

  const onChangeValue = (component, value) => {
    if (component === 'email') {
      setState({
        type: 'set-email',
        text: value,
      });
    }
  };
  const onClick = component => {
    if (component === 'on-send') {
      dispatch(SET_FORGOTPASSWOROD({email: 'HELLO'}));
    }
  };

  useEffect(() => {
    document.title = 'Forgot Password | Broowing Coffee';
  }, []);

  return (
    <View style={styles.screenPane}>
      <View style={styles.mainPane}>
        <View style={styles.leftPane}>
          <Image title='mobile-logo' source={logo} style={styles.logo} />
        </View>
        <View style={styles.rightPane}>
          <View style={styles.topPane}>
            <View style={styles.headerPane}>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>
                Please enter the email you used
              </Text>
            </View>
          </View>
          <Separator vertical={15} />
          <View style={styles.bodyPane}>
            <TextInput
              placeholder='Email'
              skin={styles.inputSkin}
              value={state.email.text}
              onChangeText={value => onChangeValue('email', value)}
              prefixIcon={
                <Icon
                  font='Feather'
                  size={ICON_SIZE}
                  name='mail'
                  color={accentColor}
                />
              }
            />
            <Separator vertical={5} />
            <Button
              skin={styles.buttonSkin}
              title='Send'
              titleStyle={styles.buttonTitle}
              onPress={() => onClick('on-send')}
            />
          </View>
          <View style={styles.bottomPane}></View>
        </View>
      </View>
    </View>
  );
}

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(null, dispatchProps)(Account);
