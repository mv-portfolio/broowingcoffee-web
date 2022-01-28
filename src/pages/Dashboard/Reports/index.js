import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {View, Text, Separator, Button, Icon} from 'components';
import {DESC_DATE_CREATED, hp} from 'utils/helper';
import {Header, PrimaryDialog, Toast} from 'context';
import {ACCENT_COLOR} from 'constants/colors';

import TransactionList from './components/TransactionList';
import OtherList from './components/OtherList';

import styles from './.module.css';
import Transaction from './modals/Transaction';
import ReportGenerator from './modals/ReportGenerator';
import {CLEAR_ERROR} from 'ducks/actions';

function Reports({error, reports, dispatch}) {
  const {title, onSetHeader} = useContext(Header);

  const {onShow: onShowToast} = useContext(Toast);
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);

  const onClick = (actionType, value) => {
    if (actionType === 'on-search-transactions-history') {
      dispatch(
        push({
          pathname: '/search',
          state: {
            path: 'report',
            type: 'transaction',
            payload: reports.transactionHistories.sort(DESC_DATE_CREATED),
          },
        }),
      );
      onSetHeader({title: `Search Transactions`});
      return;
    }
    if (actionType === 'on-search-action-history') {
      dispatch(
        push({
          pathname: '/search',
          state: {
            path: 'report',
            type: 'other',
            payload: reports.otherHistories.sort(DESC_DATE_CREATED),
          },
        }),
      );
      onSetHeader({title: `Search Actions`});
      return;
    }
    if (actionType === 'on-view-transaction-history') {
      onShowPrimaryDialog(
        <Transaction transaction={value} onCancel={onHidePrimaryDialog} />,
        {disabledTouchOutside: false},
      );
      return;
    }
    if (actionType === 'on-click-generate-report') {
      onShowPrimaryDialog(<ReportGenerator onGenerate={onHidePrimaryDialog} />, {
        disabledTouchOutside: false,
      });
      return;
    }
  };

  const errorListener = () => {
    if (error.report) {
      onHidePrimaryDialog();
      onShowToast(error.report, 4000, () => {
        dispatch(CLEAR_ERROR());
      });
      return;
    }
  };
  useEffect(errorListener, [error]);

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
            <Icon font='Feather' name='search' color={ACCENT_COLOR} size={hp(2)} />
          </Button>
        </View>
        <Separator vertical={0.75} />
        <TransactionList
          transactionHistories={reports.transactionHistories.sort(DESC_DATE_CREATED)}
          onViewTransaction={transaction =>
            onClick('on-view-transaction-history', transaction)
          }
        />
        <Separator vertical={1} />
        <View style={styles.labelPane}>
          <Text style={styles.label}>Action History</Text>
          <Button
            skin={styles.buttonSearch}
            onPress={() => onClick('on-search-action-history')}>
            <Text style={styles.textSearch}>Search</Text>
            <Separator horizontal={1} />
            <Icon font='Feather' name='search' color={ACCENT_COLOR} size={hp(2)} />
          </Button>
        </View>
        <Separator vertical={0.75} />
        <OtherList otherHistories={reports.otherHistories.sort(DESC_DATE_CREATED)} />
      </View>
      <View style={styles.bottomPane}>
        <Button
          title='GENERATE REPORTS'
          skin={styles.buttonGenerateReports}
          onPress={() => onClick('on-click-generate-report')}
        />
      </View>
    </View>
  );
}

const stateProps = ({error, reports}) => ({
  error,
  reports,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Reports);
