import {Separator, View} from 'components';
import Item from '../Item';
import styles from './.module.css';

export default function ItemList({items = [], onRemove}) {
  return (
    <View style={styles.mainPane}>
      {items.map((item, index) => (
        <View key={index}>
          <Item
            item={item}
            onRemove={() => {
              // onRemove(item);
              console.log(items);
            }}
          />
          {index + 1 !== items.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
