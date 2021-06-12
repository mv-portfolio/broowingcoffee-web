import useHook from 'hooks/local';
import infoAssessReducer from 'hooks/local/reducers/infoAssessReducer';
import styles from 'pages/Assessment/.module.css';

import {useHistory} from 'react-router-dom';
import {Image, Text, Separator, TextInput, View, Button} from 'components';
import {ASSESSMENT_INFORMATION} from 'constants/string';
import {logo} from 'assets/icons';
import {NAME_REGEX} from 'constants/regex';

export default function SignIn() {
  const history = useHistory();
  const [state, setState] = useHook(ASSESSMENT_INFORMATION, infoAssessReducer);

  const onNavigate = (route, state) => {
    history.push(route, state);
  };
  const onChangeValue = (component, value) => {
    if (component === 'firstname') {
      setState({
        type: 'set-firstname',
        text: NAME_REGEX.test(value) ? value : state.firstname.text,
      });
    } else if (component === 'lastname') {
      setState({
        type: 'set-lastname',
        text: NAME_REGEX.test(value) ? value : state.lastname.text,
      });
    }
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.leftBodyPane}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.welcome}>Welcome Newcomers!</Text>
        </View>
        <View style={styles.centerBodyPane}>
          <View style={styles.headerPane}>
            <Text style={styles.title}>Information</Text>
            <Text style={styles.subtitle}>personal identity</Text>
          </View>
          <Separator vertical={25} />
          <TextInput
            placeholder='Firstname'
            skin={styles.inputSkin}
            value={state.firstname.text}
            onChangeText={(value) => onChangeValue('firstname', value)}
          />
          <Separator vertical={3} />
          <TextInput
            placeholder='Lastname'
            skin={styles.inputSkin}
            value={state.lastname.text}
            onChangeText={(value) => onChangeValue('lastname', value)}
          />
          <Separator vertical={5} />
          <Button
            skin={styles.buttonSkin}
            title='Next'
            titleStyle={styles.buttonTitle}
            onPress={() => onNavigate('/assessment-account')}
          />
        </View>
      </View>
    </View>
  );
}
