import {View} from 'components';
import PurchasingItem from '../PurchasingItem';

import styles from './.module.css';

export default function PurchasingListItem() {
  return (
    <View style={styles.mainPane}>
      <PurchasingItem />
    </View>
  );
}
