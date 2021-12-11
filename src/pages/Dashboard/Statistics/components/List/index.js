import {View, Separator} from 'components';
import Item from '../Item';
import styles from './.module.css';

export default function List({items = []}) {
  return (
    <View style={styles.mainPane}>
      {items.map((item, index) => (
        <View key={index}>
          <Item place={index} {...item} />
          {index + 1 !== items.length && <Separator vertical={0.5} />}
        </View>
      ))}
    </View>
  );
}
