import Icon from 'react-web-vector-icons';
import useHook from 'hooks/local';
import accAssessReducer from 'hooks/local/reducers/accAssessReducer';
import styles from 'pages/Assessment/.module.css';

import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Image, Text, Separator, TextInput, View, Button} from 'components';
import {CAPITAL_CHAR_REGEX, NUMS_REGEX, SMALL_CHAR_REGEX, SYMBOLS_REGEX} from 'constants/regex';
import {logo} from 'assets/icons';
import {accentColor} from 'constants/styles';
import {ICON_SIZE} from 'constants/sizes';
import {ASSESSMENT_ACCOUNT} from 'constants/string';


export default function SignIn() {
  const history = useHistory();
  const [state, setState] = useHook(ASSESSMENT_ACCOUNT, accAssessReducer);

  const onPasswordMatchedIcon = (status) => {
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
  const onPasswordStrength = (value) => {
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
    } else if (component === 'password') {
      setState({
        ...state.password,
        type: 'set-password',
        text: value,
        strength: onPasswordStrength(value),
        isMatched: onPasswordMatched(state.confirmPassword.text, value),
      });
    } else if (component === 'confirm-password') {
      setState({
        ...state.confirmPassword,
        type: 'set-confirm-password',
        text: value,
        isMatched: onPasswordMatched(state.password.text, value),
      });
    }
  };

  const onClick = (component) => {
    if (component === 'on-encrypt-text') {
      setState({
        ...state.confirmPassword,
        type: 'set-confirm-password',
        isEncrypted: !state.confirmPassword.isEncrypted,
      });
    } else if (component === 'on-done') {
      history.replace('/assessment-information');
    }
  };

  useEffect(() => {
    const onBackPress = (event) => {
      if (window.confirm('Are you sure?')) {
        history.push('/');
      } else {
        console.log('Cancel');
        history.go(1);
      }
      event.preventDefault();
    };

    window.addEventListener('popstate', onBackPress);
    return () => {
      window.removeEventListener('popstate', onBackPress);
    };
  }, [history]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.leftBodyPane}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.welcome}>Welcome Newcomers!</Text>
        </View>
        <View style={styles.centerBodyPane}>
          <View style={styles.headerPane}>
            <Text style={styles.title}>Account</Text>
            <Text style={styles.subtitle}>personal identity</Text>
          </View>
          <Separator vertical={25} />
          <TextInput
            placeholder='Username'
            skin={styles.inputSkin}
            value={state.username.text}
            onChangeText={(value) => onChangeValue('username', value)}
            prefixIcon={<Icon font='Feather' size={ICON_SIZE} name='user' color={accentColor} />}
          />
          <Separator vertical={3} />
          <TextInput
            placeholder='Email'
            skin={styles.inputSkin}
            value={state.email.text}
            onChangeText={(value) => onChangeValue('email', value)}
            prefixIcon={<Icon font='Feather' size={ICON_SIZE} name='mail' color={accentColor} />}
          />
          <Separator vertical={3} />
          <TextInput
            placeholder='Password'
            skin={styles.inputSkin}
            value={state.password.text}
            onChangeText={(value) => onChangeValue('password', value)}
            prefixIcon={<Icon font='Feather' size={ICON_SIZE} name='lock' color={accentColor} />}
            indicatorColor={accentColor}
            indicatorProgress={state.password.strength}
            indicatorSize={18}
            isTextEncrypt={!state.confirmPassword.isEncrypted}
          />
          <Separator vertical={3} />
          <TextInput
            placeholder='Confirm-Password'
            skin={styles.inputSkin}
            value={state.confirmPassword.text}
            onChangeText={(value) => onChangeValue('confirm-password', value)}
            prefixIcon={onPasswordMatchedIcon(state.confirmPassword.isMatched)}
            isTextEncrypt={!state.confirmPassword.isEncrypted}
            onEncryptText={() => onClick('on-encrypt-text')}
          />
          <Separator vertical={5} />
          <Button
            skin={styles.buttonSkin}
            title='Done'
            titleStyle={styles.buttonTitle}
            onPress={() => onClick('on-done')}
          />
        </View>
      </View>
    </View>
  );
}
