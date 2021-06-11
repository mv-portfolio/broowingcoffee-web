import Icon from 'react-web-vector-icons';
import loginReducer from 'hooks/loginReducer';
import useHook from 'hooks';
import styles from './.module.css';

import {Image, Text, Separator, TextInput, View, Button} from 'components';
import {accentColor} from 'constants/styles';
import {logo} from 'assets/icons';
import {SIGNIN_FIELDS} from 'constants/string';

export default function SignIn() {
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
  const onClick = (component) => {
    if (component === 'on-signin') {
    } else if (component === 'on-encrypt-text') {
      setState({
        ...state.password,
        type: 'set-password',
        isEncrypted: !state.password.isEncrypted,
      });
    }
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.leftBodyPane}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.centerBodyPane}>
          <View style={styles.headerPane}>
            <Text style={styles.title}>Broowing</Text>
            <View style={styles.subtitlePane}>
              <Icon font='AntDesign' name='barschart' color='#fff' size='20px' />
              <Separator horizontal={2} />
              <Text style={styles.subtitle}>Coffee</Text>
            </View>
          </View>
          <Separator vertical={25} />
          <TextInput
            placeholder='User'
            skin={styles.inputSkin}
            prefixIcon={<Icon name='user' font='Feather' color={accentColor} size='15px' />}
            value={state.username.text}
            onChangeText={(value) => onChangeValue('username', value)}
          />
          <Separator vertical={3} />
          <TextInput
            placeholder='Password'
            skin={styles.inputSkin}
            prefixIcon={<Icon name='lock' font='Feather' color={accentColor} size='15px' />}
            isTextEncrypt={!state.password.isEncrypted}
            onEncryptText={() => onClick('on-encrypt-text')}
            value={state.password.text}
            onChangeText={(value) => onChangeValue('password', value)}
          />
          <Separator vertical={5} />
          <Button skin={styles.buttonSkin} title='SignIn' titleStyle={styles.buttonTitle} />
        </View>
      </View>
    </View>
  );
}
