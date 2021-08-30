import useHook, {assessInfo} from 'hooks';
import styles from '../.module.css';

import {useEffect} from 'react';
import {connect} from 'react-redux';
import {replace} from 'connected-react-router';
import {Text, Separator, TextInput, View, Button} from 'components';
import {ASSESSMENT_AUTH, SET_ERROR, SET_USER} from 'modules/actions';
import {NAME_REGEX} from 'constants/regex';
import {ASSESSMENT_INFORMATION} from 'constants/strings';

function Information({router: {location}, error, user, dispatch}) {
  const [state, setState] = useHook(
    ASSESSMENT_INFORMATION({
      firstname: user.firstname,
      lastname: user.lastname,
    }),
    assessInfo,
  );
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
  const onClick = component => {
    if (component === 'on-next') {
      dispatch(
        SET_USER({
          firstname: state.firstname.text,
          lastname: state.lastname.text,
        }),
      );
      dispatch(
        SET_ERROR({
          assessment: '',
        }),
      );
      dispatch(replace(`/assessment/account?sat=${location.query.sat}`));
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
          <Text style={styles.title}>Information</Text>
          <Text style={styles.subtitle}>personal identity</Text>
        </View>
      </View>
      <Separator vertical={2} />
      <View style={styles.bodyPane}>
        <TextInput
          placeholder='Firstname'
          skin={styles.inputSkin}
          value={state.firstname.text}
          onChangeText={value => onChangeValue('firstname', value)}
        />
        <Separator vertical={0.5} />
        <TextInput
          placeholder='Lastname'
          skin={styles.inputSkin}
          value={state.lastname.text}
          onChangeText={value => onChangeValue('lastname', value)}
        />
        <Separator vertical={1} />
        <Button
          skin={styles.buttonSkin}
          title='Next'
          titleStyle={styles.buttonTitle}
          onPress={() => onClick('on-next')}
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

const stateProps = ({router, error, user}) => ({
  router,
  error,
  user,
});

const dispatchProps = dispatch => ({
  dispatch: acion => dispatch(acion),
});

export default connect(stateProps, dispatchProps)(Information);
