import Icon from 'react-web-vector-icons';
import useHook from 'hooks/local';
import styles from './.module.css';

import {connect} from 'react-redux';
import {loginReducer} from 'hooks/local/reducers';
import {Image, Text, Separator, TextInput, View, Button} from 'components';
import {accentColor} from 'constants/styles';
import {SIGNIN_FIELDS} from 'constants/string';
import {logo} from 'assets/icons';
import {
  PEEK_PRODUCTS,
  PEEK_USERS,
  PUSH_PRODUCT,
} from 'hooks/global/redux/actions';

function SignIn({user, products, dispatcher}) {
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
      dispatcher(
        PUSH_PRODUCT({
          name: 'product-1',
          price: 250,
        }),
      );
    } else if (component === 'on-encrypt-text') {
      console.log(products);
      // setState({
      //   ...state.password,
      //   type: 'set-password',
      //   isEncrypted: !state.password.isEncrypted,
      // });
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
              <Icon
                font='AntDesign'
                name='barschart'
                color='#fff'
                size='20px'
              />
              <Separator horizontal={2} />
              <Text style={styles.subtitle}>coffee </Text>
            </View>
          </View>
          <Separator vertical={25} />
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
            onPress={() => onClick('on-signin')}
          />
        </View>
      </View>
    </View>
  );
}

const stateProps = ({user, users, products}) => ({
  user,
  users,
  products,
});

const dispatch = dispatch => ({
  dispatcher: acion => dispatch(acion),
});

export default connect(stateProps, dispatch)(SignIn);
