import {Separator, View} from 'components';

import Product from '../Product';
import styles from './.module.css';

export default function ProductList({onClick, data}) {
  const temp = [
    {
      based: 'coffee',
      name: 'Cafe Latte',
    },
    {
      based: 'coffee',
      name: 'Cafe Mocha',
    },
    {
      based: 'coffee',
      name: 'Caramel Latte',
    },
    {
      based: 'coffee',
      name: 'Matcha Latte',
    },
    {
      based: 'coffee',
      name: 'Cheesecake Latte',
    },
    {
      based: 'coffee',
      name: 'Hazelnut Latte',
    },
  ];

  return (
    <View style={styles.mainPane}>
      {temp.map((data, index) => (
        <View key={index} style={styles.productPane}>
          <Product data={data} />
          {index + 1 !== temp.length ? <Separator horizontal={0.75} /> : null}
        </View>
      ))}
    </View>
  );
}
