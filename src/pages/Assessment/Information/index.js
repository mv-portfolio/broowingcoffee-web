import useHook from 'hooks/local';
import infoAssessReducer from 'hooks/local/reducers/infoAssessReducer';
import styles from 'pages/Assessment/.module.css';

import {useParams} from 'react-router-dom';
import {Image, Text, Separator, TextInput, View, Button} from 'components';
import {ASSESSMENT_INFORMATION} from 'constants/strings';
import {logo} from 'assets/icons';
import {NAME_REGEX} from 'constants/regex';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {ASSESSMENT_REQUEST} from 'hooks/global/redux/actions';

function Information({assessment, dispatch}) {
  const {token} = useParams();
  const [state, setState] = useHook(ASSESSMENT_INFORMATION, infoAssessReducer);

  const onClick = component => {
    if (component === 'on-next') {
      dispatch(push(`/assessment/account/${token}`));
    }
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

  useEffect(() => {
    dispatch(ASSESSMENT_REQUEST());
  }, [dispatch]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.leftBodyPane}>
          <Image title='img-logo' source={logo} style={styles.logo} />
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
            onChangeText={value => onChangeValue('firstname', value)}
          />
          <Separator vertical={3} />
          <TextInput
            placeholder='Lastname'
            skin={styles.inputSkin}
            value={state.lastname.text}
            onChangeText={value => onChangeValue('lastname', value)}
          />
          <Separator vertical={5} />
          <Button
            skin={styles.buttonSkin}
            title='Next'
            titleStyle={styles.buttonTitle}
            onPress={() => onClick('on-next')}
          />
        </View>
      </View>
    </View>
  );
}

const statesProps = ({assessment}) => ({
  assessment,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(statesProps, dispatchProps)(Information);
