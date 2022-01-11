import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {View, Text, Separator, Button, Icon} from 'components';
import {PEEK_REPORTS} from 'ducks/actions';
import {ASC_DATE, getDateToNumber, hp} from 'utils/helper';
import {Header, PrimaryDialog} from 'context';

import TransactionList from './components/TransactionList';
import OtherList from './components/OtherList';
import {WHITE} from 'constants/colors';

import styles from './.module.css';
import Transaction from './modals/Transaction';

function Reports({user, reports, dispatch}) {
  const {title, onSetHeader} = useContext(Header);

  const {onShow: onShowPrimaryDialog} = useContext(PrimaryDialog);

  const onClick = (action, value) => {
    if (action === 'on-search-transactions-history') {
      dispatch(
        push({
          pathname: '/search',
          state: {
            path: 'report',
            type: 'transaction',
            payload: reports.transactionHistories.sort(ASC_DATE),
          },
        }),
      );
      onSetHeader({title: `Search ${title}`});
      return;
    }
    if (action === 'on-search-other-history') {
      dispatch(
        push({
          pathname: '/search',
          state: {
            path: 'report',
            type: 'other',
            payload: reports.otherHistories.sort(ASC_DATE),
          },
        }),
      );
      onSetHeader({title: `Search ${title}`});
      return;
    }
    if (action === 'on-view-transaction-history') {
      onShowPrimaryDialog(<Transaction data={value} />, {disabledTouchOutside: false});
      return;
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Reports';
    const date = new Date();
    dispatch(
      PEEK_REPORTS({
        filter: {
          date: {
            min: getDateToNumber(date, date.getDate()),
            max: getDateToNumber(date, date.getDate() + 1),
          },
          type: '',
        },
      }),
    );
  };
  useEffect(screenInitListener, []);

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.labelPane}>
          <Text style={styles.label}>Transaction History</Text>
          <Button
            skin={styles.buttonSearch}
            onPress={() => onClick('on-search-transactions-history')}>
            <Text style={styles.textSearch}>Search</Text>
            <Separator horizontal={1} />
            <Icon font='Feather' name='search' color={WHITE} size={hp(2)} />
          </Button>
        </View>
        <Separator vertical={0.75} />
        <TransactionList
          transactionHistories={reports.transactionHistories.sort(ASC_DATE)}
          onViewTransaction={transaction =>
            onClick('on-view-transaction-history', transaction)
          }
        />
        <Separator vertical={1} />
        <View style={styles.labelPane}>
          <Text style={styles.label}>Action History</Text>
          <Button
            skin={styles.buttonSearch}
            onPress={() => onClick('on-search-other-history')}>
            <Text style={styles.textSearch}>Search</Text>
            <Separator horizontal={1} />
            <Icon font='Feather' name='search' color={WHITE} size={hp(2)} />
          </Button>
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
