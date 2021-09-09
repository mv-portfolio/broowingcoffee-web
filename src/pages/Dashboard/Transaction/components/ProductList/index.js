import {Separator, View} from 'components';
import {ASC_NAME} from 'utils/helper';

import Product from '../ProductItem';
import styles from './.module.css';

export default function ProductList({products = [], onSelectProduct}) {
  return (
    <View style={styles.mainPane}>
      {products.sort(ASC_NAME).map((productInfo, index) => (
        <View key={index} style={styles.productPane}>
          <Product
            productInfo={productInfo}
            onPress={() => onSelectProduct(productInfo)}
          />
          {index + 1 !== products.length ? <Separator horizontal={0.75} /> : null}
        </View>
      ))}
    </View>
  );
}
