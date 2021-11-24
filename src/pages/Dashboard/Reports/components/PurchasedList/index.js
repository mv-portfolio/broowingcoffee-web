import {Separator, Text, View} from 'components';
import styles from './.module.css';

import PurchasedItem from '../PurchasedItem';

export default function PurchasedList({purchasedList}) {
  return (
    <View style={styles.mainPane}>
      {purchasedList.map((purchasedItem, index) => (
        <View key={index}>
          <PurchasedItem data={purchasedItem} />
          {index + 1 !== purchasedList.length && <Separator vertical={0.4} />}
        </View>
      ))}
    </View>
  );
}
