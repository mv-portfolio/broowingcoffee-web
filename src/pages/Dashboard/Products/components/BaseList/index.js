import {Text, View} from 'components';
import Base from '../Base';
import styles from './.module.css';

export default function BasedList({items = [], onDelete}) {
  return (
    <View style={styles.mainPane}>
      {items.map((item, index) => (
        <View
          key={index}
          defaultStyle={{marginBottom: index + 1 !== items.length ? '1vh' : 0}}>
          <Base {...item} onDelete={() => onDelete(item)} />
        </View>
      ))}
    </View>
  );
}
