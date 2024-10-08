import {Separator, Text, View} from 'components';
import TransactionItem from '../TransactionItem';
import OtherItem from '../OtherItem';
import styles from './.module.css';

export default function OtherList({otherHistories, style}) {
  return (
    <View style={`${styles.mainPane} ${style}`}>
      {otherHistories.map((item, index) => (
        <View key={index}>
          <OtherItem other={item} />
          {index + 1 !== otherHistories.length && <Separator vertical={0.5} />}
        </View>
      ))}
    </View>
  );
}
