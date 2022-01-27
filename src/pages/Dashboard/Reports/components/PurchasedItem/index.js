import {useState} from 'react';
import {View, Text, Separator} from 'components';
import {
  getPropsValues,
  getSpecificProperty,
  hp,
  onCleanName,
  onComputePurchasingProduct,
  onFormat,
} from 'utils/helper';
import Formatter from 'utils/Formatter';

import styles from './.module.css';

export default function PurchasedItem({product = {}}) {
  const {
    _id_product: {name},
    _id_discount: {name: discountName, value: discountValue},
    price,
  } = product;

  const [isShow, setIsShow] = useState(false);

  const upperProperties = getPropsValues(
    getSpecificProperty(['product_type', 'size', 'price'], product),
  );

  return (
    <View style={styles.mainPane} onClick={() => setIsShow(prev => !prev)}>
      <View style={styles.propertyPane} defaultStyle={{border: 'none'}}>
        <Text
          style={styles.propertyName}
          defaultStyle={{fontWeight: 'bold', fontSize: hp(1.75)}}>
          {`${Formatter.toName(name)}`}
        </Text>
        {!isShow && (
          <Text style={styles.propertyValue}>
            {Formatter.toMoney(onComputePurchasingProduct(product))}
          </Text>
        )}
      </View>
      {isShow && (
        <>
          <View style={styles.detailsPane}>
            <Separator vertical={0.5} />
            {upperProperties.map(({property, value}, index) => (
              <View
                key={index}
                style={styles.propertyPane}
                defaultStyle={{
                  marginBottom: index + 1 !== upperProperties.length ? '0.4vh' : '0',
                }}>
                <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
              </View>
            ))}
          </View>
          <Separator vertical={0.3} />
          <View style={styles.propertyPane}>
            <Text style={styles.propertyName}>discount</Text>
            <Text style={styles.propertyValue}>
              {discountName && discountValue
                ? `${discountName} (${discountValue}%)`
                : 'none'}
            </Text>
          </View>
          <Separator vertical={0.3} />
          <View style={styles.propertyPane}>
            <Text style={styles.propertyName}>discount price</Text>
            <Text style={styles.propertyValue}>
              {discountName && discountValue
                ? Formatter.toMoney((discountValue / 100) * price)
                : '0.00'}
            </Text>
          </View>
          <Separator vertical={0.3} />
          <View style={styles.propertyPane}>
            <Text style={styles.propertyName}>total price</Text>
            <Text style={styles.propertyValue}>
              {Formatter.toMoney(onComputePurchasingProduct(product))}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
