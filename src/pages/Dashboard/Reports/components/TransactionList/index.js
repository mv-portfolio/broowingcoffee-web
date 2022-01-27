import {Separator, Text, View} from 'components';
import TransactionItem from '../TransactionItem';
import styles from './.module.css';

export default function TransactionList({
  transactionHistories,
  onViewTransaction,
  style,
}) {
  return (
    <View style={`${styles.mainPane} ${style}`}>
      {transactionHistories.map((item, index) => (
        <View key={index}>
          <TransactionItem
            transaction={item}
            onViewTransaction={() => onViewTransaction(item.reference)}
          />
          {index + 1 !== transactionHistories.length && <Separator vertical={0.5} />}
        </View>
      ))}
    </View>
  );
}
