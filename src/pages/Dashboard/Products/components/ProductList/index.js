import {Separator, View} from 'components';
import ProductItem from '../ProductItem';
import styles from './.module.css';

export default function ProductList({products = [], onEdit, style}) {
  return (
    <View style={`${styles.mainPane} ${style}`}>
      {products.map((product, index) => (
        <View key={index}>
          <ProductItem
            onPress={() => onSelect(index)}
            onEdit={() => onEdit(product)}
            product={product}
          />
          {index + 1 !== products.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
