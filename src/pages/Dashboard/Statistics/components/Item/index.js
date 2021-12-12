import {Separator, Text, View} from 'components';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

export default function Item({place, color, product, availed}) {
  return (
    <View style={styles.mainPane}>
      <View style={styles.leftPane}>
        <Text style={styles.title}>{`${place + 1}.`}</Text>
        <Separator horizontal={0.75} />
        <Text style={styles.title} defaultStyle={{color}}>
          {Formatter.toName(product)}
        </Text>
      </View>
      <Text style={styles.value} defaultStyle={{color}}>{availed}</Text>
    </View>
  );
}
