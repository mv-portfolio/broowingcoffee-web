import {Separator, Text, View} from 'components';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

export default function Item({place, color, name, availed}) {
  return (
    <View style={styles.mainPane}>
      <View style={styles.leftPane}>
        <Text style={styles.title}>{`${place + 1}.`}</Text>
        <Separator horizontal={0.75} />
        <Text style={styles.title} defaultStyle={{color}}>
          {Formatter.toName(name)}
        </Text>
      </View>
      <Text style={styles.value}>{availed}</Text>
    </View>
  );
}
