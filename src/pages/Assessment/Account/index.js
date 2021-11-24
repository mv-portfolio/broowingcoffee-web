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
import {ACCENT_COLOR} from 'constants/colors';
import {ICON_SIZE} from 'constants/sizes';
import {hp} from 'utils/helper';
import {replace} from 'connected-react-router';
import {peekLocalStorage} from 'storage';
import {
  hasUpperCaseLetter,
  hasLowerCaseLetter,
  hasNumber,
  hasSymbol,
} from 'utils/checker';

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
      return <Icon font='Feather' name='check' size={ICON_SIZE} color={ACCENT_COLOR} />;
    } else {
      return <Icon font='Feather' name='x' size={ICON_SIZE} color={ACCENT_COLOR} />;
    }
  };
  const onPasswordMatched = (prevState, newState) => {
    if (prevState === newState && prevState.length) {
      return true;
    } else {
      return false;
    }
  };
  const onPasswordStrength = val => {
    let strength = 0;
    if (hasUpperCaseLetter(val)) {
      if (val.length > 2) {
        strength += 15;
      }
      strength += 10;
    }
    if (hasLowerCaseLetter(val)) {
      if (val.length > 4) {
        strength += 15;
      }
      strength += 10;
    }
    if (hasSymbol(val)) {
      if (val.length > 6) {
        strength += 15;
      }
      strength += 10;
    }
    if (hasNumber(val)) {
      if (val.length > 8) {
        strength += 15;
      }
      strength += 10;
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
      if (!state.confirmNewPassword.isMatched) {
        dispatch(SET_ERROR({assessment: 'Passwords does not Matched'}));
        return;
      }
      const userPayload = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: state.username.text,
        email: state.email.text,
        currentPassword: state.currentPassword.text,
        newPassword: state.newPassword.text,
      };
      dispatch(SET_LOADING({status: true}));
      dispatch(SET_ERROR({assessment: ''}));
      dispatch(SET_USER({...userPayload}));
      dispatch(
        SET_ASSESSMENT({
          data: {
            ...userPayload,
            currentPassword: state.currentPassword.text,
            newPassword: state.newPassword.text,
          },
        }),
      );
    }
  };

  const screenInit = () => {
    document.title = 'Broowing Coffee | Assessment';
    dispatch(ASSESSMENT_AUTH());
  };
  const errorListener = () => {
    if (error.assessment) {
      const {assessment} = error;
      if (assessment.includes('First Name') || assessment.includes('Last Name')) {
        const sat = peekLocalStorage('sat');
        dispatch(
          replace({
            pathname: '/assessment/information',
            search: `?sat=${sat}`,
          }),
        );
      }
    }
  };
  useEffect(screenInit, [dispatch]);
  useEffect(errorListener, [error]);
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
            <Icon font='Feather' size={ICON_SIZE} name='user' color={ACCENT_COLOR} />
          }
        />
        <Separator vertical={0.5} />
        <TextInput
          placeholder='Email'
          skin={styles.inputSkin}
          value={state.email.text}
          onChangeText={value => onChangeValue('email', value)}
          prefixIcon={
            <Icon font='Feather' size={ICON_SIZE} name='mail' color={ACCENT_COLOR} />
          }
        />
        <Separator vertical={0.5} />
        <TextInput
          placeholder='Current Password'
          skin={styles.inputSkin}
          value={state.currentPassword.text}
          onChangeText={value => onChangeValue('current-password', value)}
          prefixIcon={
            <Icon font='Feather' size={ICON_SIZE} name='lock' color={ACCENT_COLOR} />
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
            <Icon font='Feather' size={ICON_SIZE} name='lock' color={ACCENT_COLOR} />
          }
          indicatorColor={ACCENT_COLOR}
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
