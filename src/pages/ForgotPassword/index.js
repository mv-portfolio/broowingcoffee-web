import Icon from 'react-web-vector-icons';
import useHook, {assessAcc} from 'hooks';
import styles from './.module.css';

import {useEffect} from 'react';
import {connect} from 'react-redux';
import {accentColor} from 'constants/styles';
import {ICON_SIZE} from 'constants/sizes';
import {ASSESSMENT_ACCOUNT} from 'constants/strings';
import {SET_ERROR, SET_FORGOTPASSWOROD, SET_LOADING} from 'modules/actions';
import {Text, Separator, TextInput, View, Button} from 'components';

function Account({loading, error, dispatch}) {
  const [state, setState] = useHook(ASSESSMENT_ACCOUNT({}), assessAcc);

  const onChangeValue = (component, value) => {
    if (component === 'email') {
      setState({
        type: 'set-email',
        text: value,
      });
    }
  };
  const onClick = component => {
    if (component === 'on-send') {
      if (state.email.text.length !== 0) {
        dispatch(SET_LOADING({status: true}));
        dispatch(SET_FORGOTPASSWOROD({email: state.email.text}));
      } else {
        dispatch(
          SET_ERROR({
            forgotPassword: 'Please provide your email address.',
          }),
        );
      }
    }
  };

  useEffect(() => {
    document.title = 'Forgot Password | Broowing Coffee';
    return () => {
      dispatch(SET_ERROR({forgotPassword: ''}));
    };
  }, [dispatch]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.headerPane}>
          <Text style={styles.title}>Forgot Password</Text>
          <Separator vertical={0.25} />
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
            <Icon font='Feather' size={ICON_SIZE} name='mail' color={accentColor} />
          }
        />
        <Separator vertical={1} />
        <Button
          skin={styles.buttonSkin}
          title='Send'
          titleStyle={styles.buttonTitle}
          isLoading={loading.status}
          onPress={() => onClick('on-send')}
        />
      </View>
      <View style={styles.bottomPane}>
        {(error.forgotPassword || loading.message) && (
          <>
            <Separator vertical={0.75} />
            {loading.message ? (
              <>
                <View style={styles.infoPane}>
                  <Text style={styles.infoTitle}>{loading.message}</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.errorPane}>
                  <Text style={styles.errorTitle}>{error.forgotPassword}</Text>
                </View>
              </>
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
