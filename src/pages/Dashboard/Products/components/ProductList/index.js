import {Separator, View} from 'components';
import {useState} from 'react';
import {peekLocalStorage} from 'storage';
import ProductItem from '../ProductItem';
import styles from './.module.css';

export default function ProductList({products = [], onEdit, style}) {
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
    <View style={`${styles.mainPane} ${style}`}>
      {products.map((product, index) => (
        <View key={index}>
          <ProductItem
            onPress={() => onSelect(index)}
            onEdit={() => onEdit(product)}
            product={product}
            isOpen={
              (focus.isOpen && index === focus.index) ||
              peekLocalStorage('cfg')['always show details product']
            }
          />
          {index + 1 !== products.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
