import useHook from 'hooks/local';
import styles from '../.module.css';

import {connect} from 'react-redux';
import {Image, Text, Separator, TextInput, View, Button} from 'components';
import {logo} from 'assets/icons';
import {useEffect} from 'react';
import {push} from 'connected-react-router';
import {infoAssessReducer} from 'hooks/local/reducers';
import {useParams} from 'react-router-dom';
import {NAME_REGEX} from 'constants/regex';
import {ASSESSMENT_INFORMATION} from 'constants/strings';
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
    document.title = 'Assessment | Broowing Coffee';
    dispatch(ASSESSMENT_REQUEST());
  }, [dispatch]);

  return (
    <View style={styles.screenPane}>
      <View style={styles.mainPane}>
        <View style={styles.leftPane}>
          <Image title='mobile-logo' source={logo} style={styles.logo} />
        </View>
        <View style={styles.rightPane}>
          <View style={styles.topPane}>
            <View style={styles.headerPane}>
              <Text style={styles.title}>Information</Text>
              <Text style={styles.subtitle}>personal identity</Text>
            </View>
          </View>
          <Separator vertical={15} />
          <View style={styles.bodyPane}>
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
          <View style={styles.bottomPane}></View>
        </View>
      </View>
    </View>
  );
}

const dispatchProps = dispatch => ({
  dispatch: acion => dispatch(acion),
});

export default connect(null, dispatchProps)(Information);
