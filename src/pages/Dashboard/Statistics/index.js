import {useEffect, useReducer} from 'react';
import {connect} from 'react-redux';
import {View, Text, Separator, DatePicker} from 'components';
import {
  getManipulatedData,
  getNumPurchasedProducts,
  getTotalPurchased,
  hp,
} from 'utils/helper';
import {PEEK_TRANSACTIONS} from 'ducks/actions';
import {statistics, statisticsInitState} from 'hooks';
import LineGraph from './components/LineGraph';
import List from './components/List';
import styles from './.module.css';
import Formatter from 'utils/Formatter';

function Statistics({error, loading, transactions, dispatch}) {
  const [state, setState] = useReducer(statistics, statisticsInitState);

  const onClick = (action, value) => {
    if (action === 'on-select-most-purchasable') {
      const filtered_date = value ? new Date(value) : new Date();
      dispatch(PEEK_TRANSACTIONS({filtered_date}));
      setState({
        type: 'set',
        filteredDate: [filtered_date.getFullYear(), filtered_date.getMonth() + 1],
      });
    }
  };

  const topList = getNumPurchasedProducts(transactions.transactions).sort(function (
    a,
    b,
  ) {
    if (a.availed > b.availed) return -1;
    if (a.availed < b.availed) return 1;
    return 0;
  });

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Statistics';

    return () => {
      if (!error.auth) {
        onClick('on-select-most-purchasable');
      }
    };
  };
  const onSetViewport = width => {
    setState({type: 'set', graphStyle: {width: (94 / 100) * width, height: hp(30)}});
  };
  const onChangeViewport = () => {
    const {innerWidth: width} = window;
    if (width > 950) onSetViewport(width);
    const onResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > 950) {
        onSetViewport(currentWidth);
        return;
      }
      setState({
        type: 'set',
        graphStyle: {width: hp(150), height: hp(30)},
      });
    };
    window.addEventListener('resize', onResize);
  };
  useEffect(onChangeViewport, []);
  useEffect(screenInitListener, []);

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.header}>
          <Text style={styles.label}>Top 3 Most Purchasable</Text>
          <DatePicker
            style={styles.dateFiltered}
            date={new Date()}
            hideDateSelection={true}
            formatType='standard'
            onSelectedDate={date => onClick('on-select-most-purchasable', date)}
          />
        </View>
        <LineGraph
          isLoading={loading.status}
          style={state.graphStyle}
          manipulateData={getManipulatedData(
            transactions.transactions,
            state.filteredDate,
            topList.slice(0, 3),
          )}
          top3Products={topList.slice(0, 3)}
        />
        <Separator vertical={1} />
        <Text style={styles.label}>
          Purchased Product{`${topList.length > 1 ? 's' : ''}`} (per month)
        </Text>
        <Separator vertical={1} />
        <List items={loading.status ? [] : topList} />
      </View>
      <View style={styles.bottomPane}>
        <View style={styles.propertyPane}>
          <Text style={styles.property}>Total Number of Purchased</Text>
          <Text style={styles.value}>
            {getTotalPurchased(topList).totalNumberPurchased}
          </Text>
        </View>
        <Separator vertical={0.4} />
        <View style={styles.propertyPane}>
          <Text style={styles.property}>Total Purchased Amount</Text>
          <Text style={styles.value}>
            {Formatter.toMoney(getTotalPurchased(topList).totalAmountPurchased)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const stateProps = ({error, loading, transactions}) => ({
  error,
  loading,
  transactions,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Statistics);
