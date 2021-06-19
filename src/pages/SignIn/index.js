import Icon from 'react-web-vector-icons';
import useHook from 'hooks/local';
import styles from './.module.css';

import {useEffect} from 'react';
import {logo} from 'assets/icons';
import {connect} from 'react-redux';
import {accentColor} from 'constants/styles';
import {SIGNIN_FIELDS} from 'constants/strings';
import {loginReducer} from 'hooks/local/reducers';
import {SET_LOADING, SET_SESSION} from 'hooks/global/redux/actions';
import {Image, Text, Separator, TextInput, View, Button} from 'components';
import {push} from 'connected-react-router';

function SignIn({error, loading, dispatch}) {
  const [state, setState] = useHook(SIGNIN_FIELDS, loginReducer);
  const onChangeValue = (component, value) => {
    if (component === 'username') {
      setState({
        type: 'set-username',
        text: value,
      });
    } else if (component === 'password') {
      setState({
        ...state.password,
        type: 'set-password',
        text: value,
      });
    }
  };
  const onClick = component => {
    if (component === 'on-signin') {
      dispatch(
        SET_SESSION({
          username: state.username.text,
          password: state.password.text,
        }),
      );
      dispatch(
        SET_LOADING({
          status: true,
        }),
      );
    } else if (component === 'on-encrypt-text') {
      setState({
        ...state.password,
        type: 'set-password',
        isEncrypted: !state.password.isEncrypted,
      });
    } else if (component === 'on-forgot-password') {
      dispatch(push('/forgot-password'));
    }
  };

  useEffect(() => {
    document.title = 'Sign In | BroowingCoffee ';
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
              <Text style={styles.title}>Broowing</Text>
              <View style={styles.subtitlePane}>
                <Icon
                  font='AntDesign'
                  name='barschart'
                  color='#fff'
                  size='20px'
                />
                <Separator horizontal={2} />
                <Text style={styles.subtitle}>coffee</Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyPane}>
            <TextInput
              placeholder='User'
              skin={styles.inputSkin}
              prefixIcon={
                <Icon
                  name='user'
                  font='Feather'
                  color={accentColor}
                  size='15px'
                />
              }
              value={state.username.text}
              onChangeText={value => onChangeValue('username', value)}
            />
            <Separator vertical={3} />
            <TextInput
              placeholder='Password'
              skin={styles.inputSkin}
              prefixIcon={
                <Icon
                  name='lock'
                  font='Feather'
                  color={accentColor}
                  size='15px'
                />
              }
              isTextEncrypt={!state.password.isEncrypted}
              onEncryptText={() => onClick('on-encrypt-text')}
              value={state.password.text}
              onChangeText={value => onChangeValue('password', value)}
            />
            <Separator vertical={5} />
            <Button
              skin={styles.buttonSkin}
              title='SignIn'
              titleStyle={styles.buttonTitle}
              isLoading={loading.status}
              disabled={loading.status}
              onPress={() => onClick('on-signin')}
            />
          </View>
          <Separator vertical={10} />
          <View style={styles.bottomPane}>
            {!error.message && <View />}
            {error.message && (
              <>
                <View style={styles.errorPane}>
                  <Text style={styles.errorTitle}>{error.message}</Text>
                </View>
              </>
            )}
            <Button
              title='Forgot Password'
              titleStyle={styles.bForgotPasswordText}
              disabled={loading.status}
              onPress={() => onClick('on-forgot-password')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const stateProps = ({error, loading}) => ({
  error,
  loading,
});

const dispatchProps = dispatch => ({
  dispatch: acion => dispatch(acion),
});

export default connect(stateProps, dispatchProps)(SignIn);
