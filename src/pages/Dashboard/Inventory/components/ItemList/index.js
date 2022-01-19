import {useState} from 'react';
import {Separator, View} from 'components';
import {peekLocalStorage} from 'storage';
import Item from '../Item';
import styles from './.module.css';

export default function ItemList({items = [], onEdit, onRestock}) {
  const [focus, setFocus] = useState({
    index: 0,
    isOpen: false,
  });

  const onSelect = index => {
    setFocus(prev => {
      if (prev.index === index) {
        return {
          index,
          isOpen: !prev.isOpen,
        };
      }
      return {
        index,
        isOpen: true,
      };
    });
  };

  return (
    <View style={styles.mainPane}>
      {items.map((item, index) => (
        <View key={index}>
          <Item
            onPress={() => onSelect(index)}
            onEdit={() => onEdit(item)}
            onRestock={() => onRestock(item)}
            item={item}
            isOpen={
              (focus.isOpen && index === focus.index) ||
              peekLocalStorage('cfg')['always show details product']
            }
          />
          {index + 1 !== items.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
