import Icon from 'react-web-vector-icons';
import useHook, {assessAcc} from 'hooks';
import styles from './.module.css';

import {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  CAPITAL_CHAR_REGEX,
  NUMS_REGEX,
  SMALL_CHAR_REGEX,
  SYMBOLS_REGEX,
} from 'constants/regex';
import {
  ASSESSMENT_AUTH,
  SET_ASSESSMENT,
  SET_ERROR,
  SET_LOADING,
  SET_USER,
} from 'modules/actions';
import {Text, Separator, TextInput, View, Button} from 'components';
import {ASSESSMENT_ACCOUNT} from 'constants/strings';
import {accentColor} from 'constants/styles';
import {ICON_SIZE} from 'constants/sizes';
import {hp} from 'utils/helper';

function Account({user, loading, error, dispatch}) {
  const [state, setState] = useHook(
    ASSESSMENT_ACCOUNT({
      username: user.username,
      email: user.email,
    }),
    assessAcc,
  );

  const onPasswordMatchedIcon = status => {
    if (status) {
      return <Icon font='Feather' name='check' size={ICON_SIZE} color={accentColor} />;
    } else {
      return <Icon font='Feather' name='x' size={ICON_SIZE} color={accentColor} />;
    }
  };
  const onPasswordMatched = (prevState, newState) => {
    if (prevState === newState && newState.length > 5) {
      return true;
    } else {
      return false;
    }
  };
  const onPasswordStrength = value => {
    let strength = 0;
    if (SMALL_CHAR_REGEX.test(value)) {
      strength += 25;
    }
    if (CAPITAL_CHAR_REGEX.test(value)) {
      strength += 25;
    }
    if (NUMS_REGEX.test(value)) {
      strength += 25;
    }
    if (SYMBOLS_REGEX.test(value)) {
      strength += 25;
    }
    return strength;
  };

  const onChangeValue = (component, value) => {
    if (component === 'username') {
      setState({
        type: 'set-username',
        text: value,
      });
    } else if (component === 'email') {
      setState({
        type: 'set-email',
        text: value,
      });
    } else if (component === 'current-password') {
      setState({
        ...state.currentPassword,
        type: 'set-current-password',
        text: value,
      });
    } else if (component === 'new-password') {
      setState({
        ...state.newPassword,
        type: 'set-new-password',
        text: value,
        strength: onPasswordStrength(value),
        isMatched: onPasswordMatched(state.confirmNewPassword.text, value),
      });
    } else if (component === 'confirm-new-password') {
      setState({
        ...state.confirmNewPassword,
        type: 'set-confirm-new-password',
        text: value,
        isMatched: onPasswordMatched(state.newPassword.text, value),
      });
    }
  };

  const onClick = component => {
    if (component === 'on-encrypt-confirm-password-text') {
      setState({
        ...state.confirmNewPassword,
        type: 'set-confirm-new-password',
        isEncrypted: !state.confirmNewPassword.isEncrypted,
      });
    } else if (component === 'on-encrypt-current-password-text') {
      setState({
        ...state.currentPassword,
        type: 'set-current-password',
        isEncrypted: !state.currentPassword.isEncrypted,
      });
    } else if (component === 'on-done') {
      if (state.confirmNewPassword.isMatched) {
        const userPayload = {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: state.username.text,
          email: state.email.text,
        };
        dispatch(
          SET_LOADING({
            status: true,
          }),
        );
        dispatch(
          SET_ERROR({
            assessment: '',
          }),
        );
        dispatch(
          SET_ASSESSMENT({
            data: {
              ...userPayload,
              currentPassword: state.currentPassword.text,
              newPassword: state.newPassword.text,
            },
          }),
        );
        dispatch(SET_USER({...userPayload}));
      } else {
        dispatch(
          SET_ERROR({
            assessment: 'Password does not matched',
          }),
        );
      }
    }
  };

  useEffect(() => {
    document.title = 'Assessment | Broowing Coffee';
    dispatch(ASSESSMENT_AUTH());
  }, [dispatch]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.headerPane}>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.subtitle}>personal identity</Text>
        </View>
      </View>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <TextInput
          placeholder='Username'
          skin={styles.inputSkin}
          value={state.username.text}
          onChangeText={value => onChangeValue('username', value)}
          prefixIcon={
            <Icon font='Feather' size={ICON_SIZE} name='user' color={accentColor} />
          }
        />
        <Separator vertical={0.5} />
        <TextInput
          placeholder='Email'
          skin={styles.inputSkin}
          value={state.email.text}
          onChangeText={value => onChangeValue('email', value)}
          prefixIcon={
            <Icon font='Feather' size={ICON_SIZE} name='mail' color={accentColor} />
          }
        />
        <Separator vertical={0.5} />
        <TextInput
          placeholder='Current Password'
          skin={styles.inputSkin}
          value={state.currentPassword.text}
          onChangeText={value => onChangeValue('current-password', value)}
          prefixIcon={
            <Icon font='Feather' size={ICON_SIZE} name='lock' color={accentColor} />
          }
          isTextEncrypt={!state.currentPassword.isEncrypted}
          onEncryptText={() => onClick('on-encrypt-current-password-text')}
        />
        <Separator vertical={0.5} />
        <TextInput
          placeholder='New Password'
          skin={styles.inputSkin}
          value={state.newPassword.text}
          onChangeText={value => onChangeValue('new-password', value)}
          prefixIcon={
            <Icon font='Feather' size={ICON_SIZE} name='lock' color={accentColor} />
          }
          indicatorColor={accentColor}
          indicatorProgress={state.newPassword.strength}
          indicatorSize={hp(2.75)}
          indicatorThickness={hp(0.35)}
          isTextEncrypt={!state.confirmNewPassword.isEncrypted}
        />
        <Separator vertical={0.5} />
        <TextInput
          placeholder='Confirm New Password'
          skin={styles.inputSkin}
          value={state.confirmNewPassword.text}
          onChangeText={value => onChangeValue('confirm-new-password', value)}
          prefixIcon={onPasswordMatchedIcon(state.confirmNewPassword.isMatched)}
          isTextEncrypt={!state.confirmNewPassword.isEncrypted}
          onEncryptText={() => onClick('on-encrypt-confirm-password-text')}
        />
        <Separator vertical={1} />
        <Button
          skin={styles.buttonSkin}
          title='Done'
          titleStyle={styles.buttonTitle}
          isLoading={loading.status}
          onPress={() => onClick('on-done')}
        />
      </View>
      <View style={styles.bottomPane}>
        {error.assessment && (
          <>
            <Separator vertical={1} />
            <View style={styles.errorPane}>
              <Text style={styles.errorTitle}>{error.assessment}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
const stateProps = ({user, loading, error}) => ({
  user,
  loading,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: acion => dispatch(acion),
});

export default connect(stateProps, dispatchProps)(Account);
