import {View, Text, DatePicker, SearchField, CircleSnail} from 'components';
import {searchHistory, searchHistoryInitState} from 'hooks';
import {PrimaryDialog} from 'context';
import {PEEK_REPORTS} from 'ducks/actions';
import {useContext, useReducer} from 'react';
import {connect} from 'react-redux';
import Formatter from 'utils/Formatter';
import {DESC_DATE_CREATED, hp} from 'utils/helper';
import OtherList from '../OtherList';
import TransactionList from '../TransactionList';
import styles from './.module.css';
import Transaction from '../../modals/Transaction';
import {ACCENT_COLOR} from 'constants/colors';

function SearchHistory({dispatch, loading, reports, type}) {
  const date = new Date();

  const {onShow: onShowPrimaryDialog} = useContext(PrimaryDialog);

  const [state, setState] = useReducer(
    searchHistory,
    searchHistoryInitState({
      date,
      startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      endDate: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
    }),
  );

  const onClick = (action, value) => {
    if (action === 'on-filter-start-date') {
      setState({type: 'set', startDate: value});
      dispatch(
        PEEK_REPORTS({
          filter: {
            date: {
              min: new Date(value).getTime(),
              max: new Date(state.endDate).getTime(),
            },
            type,
          },
        }),
      );
      return;
    }
    if (action === 'on-filter-end-date') {
      setState({type: 'set', endDate: value});
      dispatch(
        PEEK_REPORTS({
          filter: {
            date: {
              min: new Date(state.startDate).getTime(),
              max: new Date(value).getTime(),
            },
            type,
          },
        }),
      );
      return;
    }
    if (action === 'on-view-transaction') {
      onShowPrimaryDialog(<Transaction data={value} />, {disabledTouchOutside: false});
    }
  };
  const onChange = (action, value) => {
    if (action === 'on-search') {
      setState({
        type: 'set',
        search: value,
        filter: onSearch(value),
      });
    }
  };
  const onSearch = value => {
    const isTransaction = type === 'transaction';
    const onSearchTransactionHistories = value => history => {
      const {reference} = history;
      if (reference._id.includes(value)) {
        return history;
      }
    };
    const onSearchOtherHistories = value => history => {
      const {reference} = history;
      if (reference.name.includes(value)) {
        return history;
      }
    };
    const filterTemp = (
      isTransaction ? reports.transactionHistories : reports.otherHistories
    ).filter(
      isTransaction ? onSearchTransactionHistories(value) : onSearchOtherHistories(value),
    );
    return filterTemp.sort(DESC_DATE_CREATED);
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.label}>{`${Formatter.toName(
          type === 'transaction' ? type : 'Action',
        )} History`}</Text>
      </View>
      <View style={styles.bodyPane}>
        <View style={styles.bodyHeaderPane}>
          <View style={styles.filterPane}>
            <View style={styles.filterDatePane}>
              <Text style={styles.filterDateLabel}>Start:</Text>
              <DatePicker
                title='Start Date'
                date={state.startDate}
                endDate={state.endDate}
                formatType='standard'
                onSelectedDate={date => onClick('on-filter-start-date', date)}
              />
            </View>
            <View style={styles.filterDatePane}>
              <Text style={styles.filterDateLabel}>End:</Text>
              <DatePicker
                title='End Date'
                date={state.endDate}
                startDate={state.startDate}
                formatType='standard'
                onSelectedDate={date => onClick('on-filter-end-date', date)}
              />
            </View>
          </View>
          <SearchField
            value={state.search}
            onChangeText={value => onChange('on-search', value)}
          />
        </View>
        {type === 'transaction' ? (
          <>
            {loading.status ? (
              <View style={styles.loadingPane}>
                <CircleSnail color={ACCENT_COLOR} size={hp(5)} thickness={hp(0.6)} />
              </View>
            ) : (
              <TransactionList
                transactionHistories={
                  state.search.length > 0
                    ? state.filter
                    : reports.transactionHistories.sort(DESC_DATE_CREATED)
                }
                style={styles.list}
                onViewTransaction={transaction =>
                  onClick('on-view-transaction', transaction)
                }
              />
            )}
          </>
        ) : (
          <>
            {loading.status ? (
              <View style={styles.loadingPane}>
                <CircleSnail color={ACCENT_COLOR} size={hp(5)} thickness={hp(0.6)} />
              </View>
            ) : (
              <OtherList
                otherHistories={
                  state.search.length > 0
                    ? state.filter
                    : reports.otherHistories.sort(DESC_DATE_CREATED)
                }
                style={styles.list}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

const stateProps = ({loading, reports}) => ({
  loading,
  reports,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(SearchHistory);
