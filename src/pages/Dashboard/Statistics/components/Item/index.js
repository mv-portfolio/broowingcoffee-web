import {Text, View} from 'components';
import * as Formatter from 'utils/Formatter';
import styles from './.module.css';

export default function Item({place, color, product, availed}) {
  return (
    <View style={styles.mainPane}>
      <Text style={styles.title} defaultStyle={{color}}>{`${
        place + 1
      }. ${Formatter.toName(product)}`}</Text>
      <Text style={styles.value}>{availed}</Text>
    </View>
  );
}
