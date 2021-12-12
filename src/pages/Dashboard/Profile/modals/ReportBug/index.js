import {useContext, useReducer} from 'react';
import {connect} from 'react-redux';
import {Button, Separator, Text, TextInput, View} from 'components';
import {reportBug, reportBugInitState} from 'hooks';
import {Toast} from 'context';
import * as Formatter from 'utils/Formatter';

import styles from './.module.css';
import {REPORT_BUG, SET_LOADING} from 'ducks/actions';

function ReportBug({user, loading, dispatch}) {
  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useReducer(reportBug, reportBugInitState);

  const onClick = action => {
    if (action === 'on-click-send-report') {
      if (!state.issue || !state.title) {
        onShowToast('Please enter important field');
        return;
      }
      dispatch(SET_LOADING({status: true}));
      dispatch(REPORT_BUG({from: user.email, title: state.title, issue: state.issue}));
    }
  };

  const onChange = (action, value) => {
    if (action === 'on-change-title') {
      setState({type: 'set', title: value});
      return;
    }
    if (action === 'on-change-issue') {
      setState({type: 'set', issue: value});
      return;
    }
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>Report Bug</Text>
        <Text style={styles.subtitle}>{Formatter.toLocaleString(new Date())}</Text>
      </View>
      <View style={styles.bodyPane}>
        <TextInput
          placeholder='Title'
          skin={styles.input}
          value={state.title}
          onChangeText={text => onChange('on-change-title', text)}
        />
        <Separator vertical={1} />
        <textarea
          className={styles.textArea}
          placeholder="What's the issue?"
          draggable={false}
          value={state.issue}
          onChange={({target: {value: text}}) => onChange('on-change-issue', text)}
        />
      </View>
      <View style={styles.bottomPane}>
        <Button
          title='Send Report'
          skin={styles.button}
          isLoading={loading.status}
          onPress={() => onClick('on-click-send-report')}
        />
      </View>
    </View>
  );
}

const stateProps = ({user, loading}) => ({user, loading});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(ReportBug);
