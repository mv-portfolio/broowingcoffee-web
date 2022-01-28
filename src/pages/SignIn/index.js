import Icon from 'react-web-vector-icons';
import useHook, {login} from 'hooks';
import styles from './.module.css';

import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {ACCENT_COLOR} from 'constants/colors';
import {SIGNIN_FIELDS} from 'constants/strings';
import {SET_ERROR, CLEAR_SIGNIN, SET_LOADING, SET_SIGNIN} from 'ducks/actions';
import {Text, Separator, TextInput, View, Button} from 'components';
import {PrimaryDialog, SecondaryDialog} from 'context';
import {push} from 'connected-react-router';
import {ICON_SIZE} from 'constants/sizes';

function SignIn({error, loading, dispatch}) {
  const [state, setState] = useHook(SIGNIN_FIELDS, login);
  const {onHide: onHidePrimaryDialog} = useContext(PrimaryDialog);
  const {onHide: onHideSecondaryDialog} = useContext(SecondaryDialog);

  const onChangeValue = (actionType, value) => {
    if (actionType === 'username') {
      setState({
        type: 'set-username',
        text: value,
      });
      return;
    }
    if (actionType === 'password') {
      setState({
        ...state.password,
        type: 'set-password',
        text: value,
      });
      return;
    }
  };
  const onClick = actionType => {
    if (actionType === 'on-signin') {
      dispatch(
        SET_SIGNIN({
          username: state.username.text,
          password: state.password.text,
        }),
      );
      dispatch(
        SET_LOADING({
          status: true,
        }),
      );
      return;
    }
    if (actionType === 'on-encrypt-text') {
      setState({
        ...state.password,
        type: 'set-password',
        isEncrypted: !state.password.isEncrypted,
      });
      return;
    }
    if (actionType === 'on-forgot-password') {
      dispatch(push('/forgot-password'));
      return;
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | SignIn ';
    onHidePrimaryDialog();
    onHideSecondaryDialog();
    return () => {
      dispatch(CLEAR_SIGNIN());
      dispatch(SET_ERROR({signin: ''}));
    };
  };
  const errorListener = () => {
    if (error.signin) {
      setState({type: 'clear'});
    }
  };
  useEffect(errorListener, [error]);
  useEffect(screenInitListener, [dispatch]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.headerPane}>
          <Text style={styles.title}>Broowing</Text>
          <View style={styles.subtitlePane}>
            <Icon font='AntDesign' name='barschart' color={ACCENT_COLOR} size='3vh' />
            <Separator horizontal={0.4} />
            <Text style={styles.subtitle}>Coffee</Text>
          </View>
        </View>
      </View>
      <View style={styles.bodyPane}>
        <TextInput
          placeholder='Username'
          skin={styles.inputSkin}
          prefixIcon={
            <Icon name='user' font='Feather' color={ACCENT_COLOR} size={ICON_SIZE} />
          }
          value={state.username.text}
          onChangeText={value => onChangeValue('username', value)}
        />
        <Separator vertical={0.5} />
        <TextInput
          placeholder='Password'
          skin={styles.inputSkin}
          prefixIcon={
            <Icon name='lock' font='Feather' color={ACCENT_COLOR} size={ICON_SIZE} />
          }
          isTextEncrypt={!state.password.isEncrypted}
          onEncryptText={() => onClick('on-encrypt-text')}
          value={state.password.text}
          onChangeText={value => onChangeValue('password', value)}
        />
        <Separator vertical={1} />
        <Button
          skin={styles.buttonSkin}
          title='Sign In'
          titleStyle={styles.buttonTitle}
          isLoading={loading.status}
          onPress={() => onClick('on-signin')}
        />
      </View>
      <View style={styles.bottomPane}>
        {!error.signin && <View />}
        {error.signin && (
          <>
            <View style={styles.errorPane}>
              <Text style={styles.errorTitle}>{error.signin}</Text>
            </View>
          </>
        )}
        <Button
          skin={styles.buttonSkin}
          body={styles.buttonBody}
          disabled={loading.status}
          onPress={() => onClick('on-forgot-password')}>
          <Text style={styles.buttonText}>Forgot Password?</Text>
        </Button>
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
