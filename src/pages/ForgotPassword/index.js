import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import useHook, {assessAcc} from 'hooks';
import Icon from 'react-web-vector-icons';

import {ACCENT_COLOR} from 'constants/colors';
import {ICON_SIZE} from 'constants/sizes';
import {ASSESSMENT_ACCOUNT} from 'constants/strings';
import {SET_ERROR, SET_FORGOTPASSWOROD, SET_LOADING} from 'modules/actions';
import {Text, Separator, TextInput, View, Button} from 'components';
import {isEmail} from 'utils/checker';
import styles from './.module.css';

function Account({loading, error, dispatch}) {
  const [isSent, setIsSent] = useState(false);
  const [state, setState] = useHook(ASSESSMENT_ACCOUNT({}), assessAcc);

  const onChangeValue = (component, value) => {
    if (component === 'email') {
      setState({
        type: 'set-email',
        text: value,
      });
    }
  };
  const onClick = (component, val) => {
    if (component === 'on-send') {
      if (!isEmail(val) || val.length === 0) {
        dispatch(SET_ERROR({forgotPassword: 'Please enter a valid email address'}));
        return;
      }
      setIsSent(true);
      dispatch(SET_LOADING({status: true}));
      dispatch(SET_FORGOTPASSWOROD({email: state.email.text}));
    }
  };

  useEffect(() => {
    document.title = 'Broowing Coffee | Forgot Password';
    return () => {
      dispatch(SET_ERROR({forgotPassword: ''}));
    };
  }, [dispatch]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.headerPane}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Please enter the email you used</Text>
        </View>
      </View>
      <View style={styles.bodyPane}>
        <TextInput
          placeholder='Email'
          skin={styles.inputSkin}
          value={state.email.text}
          onChangeText={value => onChangeValue('email', value)}
          prefixIcon={
            <Icon font='Feather' size={ICON_SIZE} name='mail' color={ACCENT_COLOR} />
          }
        />
        <Separator vertical={1} />
        <Button
          skin={styles.buttonSkin}
          title='Send'
          titleStyle={styles.buttonTitle}
          isLoading={loading.status}
          disabled={isSent}
          onPress={() => onClick('on-send', state.email.text)}
        />
      </View>
      <View style={styles.bottomPane}>
        {(error.forgotPassword || loading.message) && (
          <>
            <Separator vertical={0.75} />
            {loading.message ? (
              <View style={styles.infoPane}>
                <Text style={styles.infoTitle}>{loading.message}</Text>
              </View>
            ) : (
              <View style={styles.errorPane}>
                <Text style={styles.errorTitle}>{error.forgotPassword}</Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const stateProps = ({loading, error}) => ({
  error,
  loading,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Account);
