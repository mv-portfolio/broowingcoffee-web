import {Separator, View} from 'components';
import {useState} from 'react';
import Item from '../Item';
import styles from './.module.css';

export default function List({items = [], onSelect}) {
  const [selected, setSelected] = useState({index: NaN, item: {}});

  const onSelectItem = (item, index) => {
    setSelected({item, index});
    onSelect(item);
  };

  return (
    <View style={styles.mainPane}>
      {items.map((item, index) => (
        <View key={index}>
          <Item
            item={item}
            onClick={() => onSelectItem(item, index)}
            isSelected={selected.index === index}
          />
          {index + 1 !== items.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
