import {Separator, View} from 'components';
import {useState} from 'react';
import ProductItem from '../Item';
import styles from './.module.css';

export default function ItemList({items = [], onEdit}) {
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
      {items.map((product, index) => (
        <View key={index}>
          <ProductItem
            onPress={() => onSelect(index)}
            onEdit={() => onEdit(product)}
            product={product}
            isOpen={focus.isOpen && index === focus.index}
          />
          {index + 1 !== items.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
