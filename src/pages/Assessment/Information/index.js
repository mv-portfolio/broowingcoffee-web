import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import useHook, {assessInfo} from 'hooks';
import {replace} from 'connected-react-router';
import {Text, Separator, TextInput, View, Button} from 'components';
import {ASSESSMENT_AUTH, SET_ERROR, SET_USER} from 'ducks/actions';
import {NAME_REGEX} from 'constants/regex';
import {ASSESSMENT_INFORMATION} from 'constants/strings';
import {Toast} from 'context';

import styles from './.module.css';

function Information({router: {location}, error, user, dispatch}) {
  const {onShow: onShowToast} = useContext(Toast);
  const [state, setState] = useHook(
    ASSESSMENT_INFORMATION({
      firstname: user.firstname,
      lastname: user.lastname,
    }),
    assessInfo,
  );
  const onChangeValue = (actionType, value) => {
    if (actionType === 'firstname') {
      setState({
        type: 'set-firstname',
        text: NAME_REGEX.test(value) ? value : state.firstname.text,
      });
    } else if (actionType === 'lastname') {
      setState({
        type: 'set-lastname',
        text: NAME_REGEX.test(value) ? value : state.lastname.text,
      });
    }
  };
  const onClick = actionType => {
    if (actionType === 'on-next') {
      if (!state.firstname.text || !state.lastname.text) {
        onShowToast('Please enter important field(s)');
        return;
      }
      dispatch(
        SET_USER({
          firstname: state.firstname.text,
          lastname: state.lastname.text,
        }),
      );
      dispatch(SET_ERROR({assessment: ''}));
      dispatch(replace(`/assessment/account?sat=${location.query.sat}`));
    }
  };

  useEffect(() => {
    document.title = 'Broowing Coffee | Assessment ';
    dispatch(ASSESSMENT_AUTH());
  }, [dispatch]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.headerPane}>
          <Text style={styles.title}>INFORMATION</Text>
          <Separator vertical={0.15} />
          <Text style={styles.subtitle}>PERSONAL IDENTITY</Text>
        </View>
      </View>
      <Separator vertical={1} />
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
          title='Next'
          skin={styles.buttonSkin}
          titleStyle={styles.buttonTitle}
          onPress={() => onClick('on-next')}
        />
      </View>
      <View style={styles.bottomPane}>
        {error.assessment && (
          <>
            <View style={styles.errorPane}>
              <Text style={styles.errorTitle}>{error.assessment}</Text>
            </View>
          </>
        )}
        <Separator vertical={1} />
        <Text style={styles.reminder}>
          This is a one time assessment only. Please make sure that all information are
          valid and correct before proceeding
        </Text>
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
