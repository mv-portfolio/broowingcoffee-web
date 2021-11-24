import {useState} from 'react';
import {View, Text, Separator} from 'components';
import {getPropsValues, hp, onCleanName, onComputeTransaction, onFormat} from 'utils/helper';
import PurchasedList from '../../components/PurchasedList';
import styles from './.module.css';

export default function Transaction({data}) {
  const {_id, products} = data;

  const bottomProps = getPropsValues(data)
    .filter(data => data.property !== 'products')
    .filter(data => data.property !== '_id')
    .filter(data => data.property !== '__v');

  const [state, setState] = useState({index: 0, isShow: false});

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.label}>Transaction ID</Text>
        <Separator vertical={0.15} />
        <Text style={styles.title}>{_id}</Text>
      </View>
      <View style={styles.bodyPane}>
        <Text style={styles.label}>{`Purchased Product${
          products.length > 1 ? 's' : ''
        }`}</Text>
        <Separator vertical={0.65} />
        <PurchasedList purchasedList={products} />
      </View>
      <View style={styles.bottomPane}>
        {bottomProps.map(({property, value}, index) => (
          <View key={index}>
            <View style={styles.propertyPane}>
              <Text style={styles.propertyName}>{onCleanName(property)}</Text>
              <Text style={styles.propertyValue}>
                {onFormat(property, value) ? onFormat(property, value) : 'none'}
              </Text>
            </View>
            {index + 1 !== bottomProps.length && <Separator vertical={0.4} />}
          </View>
        ))}
        <Separator vertical={0.4} />
        <View style={styles.propertyPane}>
          <Text style={styles.propertyName}>TOTAL PRICE</Text>
          <Text style={styles.propertyValue} defaultStyle={{fontSize: hp(2)}}>{onComputeTransaction(data)}</Text>
        </View>
      </View>
    </View>
  );
}
