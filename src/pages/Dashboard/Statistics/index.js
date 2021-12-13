import {useEffect, useReducer} from 'react';
import {connect} from 'react-redux';
import {View, Text, Separator, DatePicker} from 'components';
import {
  getTotalAmountPurchasedProducts,
  getTotalAvailedProducts,
  hp,
  wp,
} from 'utils/helper';
import {PEEK_TRANSACTIONS} from 'ducks/actions';
import {statistics, statisticsInitState} from 'hooks';
import LineGraph from './components/LineGraph';
import List from './components/List';
import styles from './.module.css';

function Statistics({user, loading, transactions, dispatch}) {
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

  const onSetViewport = width => {
    setState({type: 'set', graphStyle: {width: (99 / 100) * width, height: hp(30)}});
  };
  const onChangeViewport = () => {
    const {innerWidth: width} = window;
    if (width > 1095) onSetViewport(width);

    const onResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > 1095) {
        onSetViewport(currentWidth);
        return;
      }
      setState({type: 'set', graphStyle: {width: hp(150), height: hp(30)}});
    };

    window.addEventListener('resize', onResize);
  };
  useEffect(onChangeViewport, []);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.header}>
          <Text style={styles.label}>Top 3 Most Purchasable</Text>
          <DatePicker
            date={new Date()}
            hideDateSelection={true}
            formatType='standard'
            onSelectedDate={date => onClick('on-select-most-purchasable', date)}
          />
        </View>
        <LineGraph
          isLoading={loading.status}
          style={state.graphStyle}
          data={transactions.data}
          top3Products={transactions.topList.slice(0, 3)}
          filteredDate={state.filteredDate}
        />
      </View>
      <View style={styles.bodyPane}>
        <Text style={styles.label}>
          Purchased Product{`${transactions.topList.length > 1 ? 's' : ''}`} (month)
        </Text>
        <Separator vertical={1} />
        <List items={loading.status ? [] : transactions.topList} />
      </View>
      <View style={styles.bottomPane}>
        <View style={styles.propertyPane}>
          <Text style={styles.property}>Total Purchased Products</Text>
          <Text style={styles.value}>{getTotalAvailedProducts(transactions.data)}</Text>
        </View>
        <Separator vertical={0.4} />
        <View style={styles.propertyPane}>
          <Text style={styles.property}>Total Purchased Amount</Text>
          <Text style={styles.value}>
            {getTotalAmountPurchasedProducts(transactions.data)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const stateProps = ({user, loading, transactions}) => ({
  user,
  loading,
  transactions,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Statistics);
