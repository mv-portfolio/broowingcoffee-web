import {useState} from 'react';
import {cold, hot} from 'assets/images';
import {Button, Icon, Image, Separator, View} from 'components';
import styles from './.module.css';
import {getProductConsumed} from 'utils/helper';

export default function ProductType({product, size, selected, onSelect}) {
  const {consumed} = product;

  const [select, setSelect] = useState(selected || '');

  const onSelectProductType = value => {
    setSelect(value);
    onSelect(value);
  };

  const getProperty = (size, product_type) => ({
    disabled: getProductConsumed(size, product_type, consumed).price ? false : true,
    defaultStyle: {
      boxShadow: getProductConsumed(size, product_type, consumed).price
        ? select === product_type
          ? 'none'
          : '0 0.5vh 0.25vh rgba(0, 0, 0, 0.2)'
        : 'none',
      border: select === product_type ? 'solid 0.35vh var(--ACCENT-COLOR)' : '',
    },
  });

  return (
    <View style={styles.mainPane}>
      <Button
        skin={styles.buttonSkin}
        body={styles.buttonBody}
        {...getProperty(size, 'hot')}
        onClick={() => onSelectProductType('hot')}>
        <Image source={hot} style={styles.icon} />
      </Button>
      <Separator horizontal={1} />
      <Button
        skin={styles.buttonSkin}
        body={styles.buttonBody}
        {...getProperty(size, 'cold')}
        onClick={() => onSelectProductType('cold')}>
        <Image source={cold} style={styles.icon} />
      </Button>
    </View>
  );
}
