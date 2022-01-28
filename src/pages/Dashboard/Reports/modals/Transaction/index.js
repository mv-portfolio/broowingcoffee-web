import {useState} from 'react';
import {View, Button, Icon, Text, Separator} from 'components';
import {
  hp,
  getDefaultObjectProducts,
  getPropsValues,
  onCleanName,
  onComputePurchasingProducts,
  onFormat,
} from 'utils/helper';
import PurchasedList from '../../components/PurchasedList';
import {BACKGROUND_COLOR4} from 'constants/colors';
import styles from './.module.css';
import Formatter from 'utils/Formatter';

export default function Transaction({transaction, onCancel}) {
  const {_id, cash, products} = transaction;

  const bottomProps = getPropsValues(transaction)
    .filter(data => data.property !== 'products')
    .filter(data => data.property !== '_id')
    .filter(data => data.property !== '__v');

  const [state, setState] = useState({index: 0, isShow: false});

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.upperTopPane}>
          <Text style={styles.label}>Transaction ID</Text>
          <Button skin={styles.closeButton} onPress={onCancel}>
            <Icon font='Feather' name='x' size={hp(2.75)} color={BACKGROUND_COLOR4} />
          </Button>
        </View>
        <Separator vertical={0.15} />
        <Text style={styles.title}>{_id}</Text>
      </View>
      <View style={styles.bodyPane}>
        <Text style={styles.label}>{`Product${products.length > 1 ? 's' : ''}`}</Text>
        <Separator vertical={0.65} />
        <PurchasedList purchasedList={getDefaultObjectProducts(products)} />
      </View>
      <View style={styles.bottomPane}>
        {bottomProps.map(({property, value}, index) => (
          <View
            key={index}
            style={styles.propertyPane}
            defaultStyle={{
              marginBottom: index + 1 !== bottomProps.length ? '0.6vh' : '0',
            }}>
            <Text style={styles.propertyName}>
              {onCleanName(property, 'transactions')}
            </Text>
            <Text style={styles.propertyValue}>
              {onFormat(property, value)
                ? onFormat(property, value, 'transactions')
                : 'none'}
            </Text>
          </View>
        ))}
        <Separator vertical={0.2} />
        <View style={styles.propertyPane}>
          <Text style={styles.propertyName}>change</Text>
          <Text style={styles.propertyValue}>
            {Formatter.toMoney(parseFloat(cash - onComputePurchasingProducts(products)))}
          </Text>
        </View>
        <Separator vertical={0.2} />
        <View style={styles.propertyPane}>
          <Text style={styles.propertyName}>total price</Text>
          <Text style={styles.propertyValue} defaultStyle={{fontSize: hp(1.8)}}>
            {Formatter.toMoney(onComputePurchasingProducts(products))}
          </Text>
        </View>
      </View>
    </View>
  );
}
