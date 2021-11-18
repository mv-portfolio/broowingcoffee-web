import {useEffect, useReducer} from 'react';
import {connect} from 'react-redux';
import {View, Text, Separator, SearchField} from 'components';
import {PEEK_REPORTS} from 'modules/actions';

import styles from './.module.css';
import TransactionList from './components/TransactionList';
import {reports as reportsReducer, reportsInitState} from 'hooks/reducers';
import OtherList from './components/OtherList';
import {ASC_DATE} from 'utils/helper';

function Reports({user, reports, dispatch}) {
  const [state, setState] = useReducer(reportsInitState, reportsReducer);

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Reports';
    dispatch(PEEK_REPORTS());
  };
  useEffect(screenInitListener, []);
  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.labelPane}>
          <Text style={styles.label}>Transaction History</Text>
          <SearchField />
        </View>
        <Separator vertical={0.75} />
        <TransactionList
          transactionHistories={reports.transactionHistories.sort(ASC_DATE)}
        />
        <Separator vertical={1} />
        <View style={styles.labelPane}>
          <Text style={styles.label}>Other History</Text>
          <SearchField />
        </View>
        <Separator vertical={0.75} />
        <OtherList otherHistories={reports.otherHistories.sort(ASC_DATE)} />
      </View>
      <View style={styles.bottomPane}></View>
    </View>
  );
}

const stateProps = ({user, reports}) => ({
  user,
  reports,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Reports);
