import {Separator, View} from 'components';
import Item from '../Item';
import styles from './.module.css';

export default function ItemList({items = [], onRemove}) {
  return (
    <View style={styles.mainPane}>
      {items.map((item, index) => (
        <View key={index}>
          <Item key={index} item={item} onRemove={() => onRemove(item._id_item.name)} />
          {index + 1 !== items.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
