import {useEffect, useReducer} from 'react';
import {View, Text, Separator, DatePicker} from 'components';
import {connect} from 'react-redux';
import styles from './.module.css';
import LineGraph from './components/LineGraph';
import {PEEK_TRANSACTIONS} from 'ducks/actions';
import {statistics, statisticsInitState} from 'hooks';
import List from './components/List';

function Statistics({user, transactions, dispatch}) {
  const [state, setState] = useReducer(statistics, statisticsInitState);

  const onClick = (action, value) => {
    if (action === 'on-select-most-purchasable') {
      const date = new Date(value);
      dispatch(PEEK_TRANSACTIONS({date}));
      setState({type: 'set', filteredDate: [date.getFullYear(), date.getMonth() + 1]});
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Statistics';
    const date = new Date();
    dispatch(PEEK_TRANSACTIONS({date}));
    setState({type: 'set', filteredDate: [date.getFullYear(), date.getMonth() + 1]});
  };
  useEffect(screenInitListener, []);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.header}>
          <Text style={styles.label}>Most Purchasable</Text>
          <DatePicker
            date={new Date()}
            hideDateSelection={true}
            formatType='standard'
            onSelectedDate={date => onClick('on-select-most-purchasable', date)}
          />
        </View>
        <LineGraph
          data={transactions.data}
          top3Products={transactions.topList.slice(0, 3)}
          filteredDate={state.filteredDate}
        />
      </View>
      <View style={styles.bodyPane}>
        <Text style={styles.label}>Total Purchased (monthly)</Text>
        <Separator vertical={1} />
        <List items={transactions.topList} />
      </View>
    </View>
  );
}

const stateProps = ({user, transactions}) => ({
  user,
  transactions,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Statistics);
