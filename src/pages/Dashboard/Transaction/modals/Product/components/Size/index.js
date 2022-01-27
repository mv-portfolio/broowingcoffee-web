import {Button, Separator, View} from 'components';
import {useState} from 'react';
import {getProductConsumed} from 'utils/helper';
import styles from './.module.css';

export default function Size({product, productType, selected, onSelect}) {
  const {consumed} = product;

  const [select, setSelect] = useState(selected || '');

  const onSelectedsize = value => {
    setSelect(value);
    onSelect(value);
  };

  const getProperty = (size, product_type) => ({
    disabled: getProductConsumed(size, product_type, consumed).price ? false : true,
    defaultStyle: {
      boxShadow: getProductConsumed(size, product_type, consumed).price
        ? select === size
          ? 'none'
          : '0 0.5vh 0.25vh rgba(0, 0, 0, 0.2)'
        : 'none',
      border: select === size ? 'solid 0.3vh var(--ACCENT-COLOR)' : '',
    },
  });

  return (
    <View style={styles.mainPane}>
      <Button
        title='S'
        titleStyle={styles.buttonText}
        skin={styles.buttonSkin}
        body={styles.buttonBody}
        {...getProperty('small', productType)}
        onPress={() => onSelectedsize('small')}
      />
      <Separator vertical={0.5} />
      <Button
        title='M'
        titleStyle={styles.buttonText}
        skin={styles.buttonSkin}
        body={styles.buttonBody}
        {...getProperty('medium', productType)}
        onPress={() => onSelectedsize('medium')}
      />
      <Separator vertical={0.5} />
      <Button
        title='L'
        titleStyle={styles.buttonText}
        skin={styles.buttonSkin}
        body={styles.buttonBody}
        {...getProperty('large', productType)}
        onPress={() => onSelectedsize('large')}
      />
    </View>
  );
}
