import {useEffect, useReducer} from 'react';
import {connect} from 'react-redux';
import {View, Text, Separator, DatePicker} from 'components';
import {getTotalAmountPurchasedProducts, getTotalPurchased, hp, wp} from 'utils/helper';
import {PEEK_TRANSACTIONS} from 'ducks/actions';
import {statistics, statisticsInitState} from 'hooks';
import LineGraph from './components/LineGraph';
import List from './components/List';
import styles from './.module.css';
import Formatter from 'utils/Formatter';

function Statistics({user, loading, transactions, dispatch}) {
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

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Statistics';
    onClick('on-select-most-purchasable');
  };
  const onSetViewport = width => {
    setState({type: 'set', graphStyle: {width: (97.5 / 100) * width, height: hp(30)}});
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
      setState({type: 'set', graphStyle: {width: hp(150), height: hp(30)}});
    };
    window.addEventListener('resize', onResize);
  };
  useEffect(onChangeViewport, []);
  useEffect(screenInitListener, []);

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
          manipulateData={transactions.manipulated_data}
          top3Products={transactions.top_list.slice(0, 3)}
        />
      </View>
      <View style={styles.bodyPane}>
        <Text style={styles.label}>
          Purchased Product{`${transactions.top_list.length > 1 ? 's' : ''}`} (per month)
        </Text>
        <Separator vertical={1} />
        <List items={loading.status ? [] : transactions.top_list} />
      </View>
      <View style={styles.bottomPane}>
        <View style={styles.propertyPane}>
          <Text style={styles.property}>Total Purchased Products</Text>
          <Text style={styles.value}>
            {getTotalPurchased(transactions.top_list).totalNumberPurchased}
          </Text>
        </View>
        <Separator vertical={0.4} />
        <View style={styles.propertyPane}>
          <Text style={styles.property}>Total Purchased Amount</Text>
          <Text style={styles.value}>
            {Formatter.toMoney(
              getTotalPurchased(transactions.top_list).totalAmountPurchased,
            )}
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
