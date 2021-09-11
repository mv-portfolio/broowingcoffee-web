import {Button, Separator, Text, View} from 'components';
import {NUMBER_REGEX} from 'constants/regex';
import {useState} from 'react';
import {sumOfPrice} from 'utils/helper';
import PurchasingListItem from '../../components/PurchasingListItem';

import styles from './.module.css';
import TextInput from './TextInput';

export default function Details({
  onPurchase,
  onCancel,
  purchasingProducts,
  onEditSelectedPurchasingProduct,
}) {
  const [totalDiscount, setTotalDiscount] = useState('');

  const getPurchasingProduct = (products = []) => {
    let temp_products = {
      date_created: new Date().getTime(),
      discount: parseInt(totalDiscount),
      products: [],
    };

    temp_products.products = products.map(item => {
      return {
        _id_product: item._id,
        type: item.type,
        discount: parseInt(item.discount),
      };
    });

    return temp_products;
  };

  const onSumAllProducts = (products = [], totalDiscount = 0) => {
    let totalPrice = 0;
    let temp_totalDiscount = 0;
    products.forEach(item => {
      const price = item.type === 'hot' ? item.hot_price : item.cold_price;
      const addonsTotalPrice = sumOfPrice(item.addons);
      const discount = (item.discount / 100) * (price + addonsTotalPrice);
      totalPrice += price + addonsTotalPrice - discount;
    });
    temp_totalDiscount = (parseInt(totalDiscount || 0) / 100) * totalPrice;
    return totalPrice - temp_totalDiscount;
  };

  const onClick = actionType => {
    if (actionType === 'on-click-purchase') {
      const products = getPurchasingProduct(purchasingProducts);
      onPurchase(products);
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-discount') {
      const parsedVal = parseInt(value);
      if (
        (NUMBER_REGEX.test(value) && parsedVal >= 0 && parsedVal <= 100) ||
        value.length === 0
      ) {
        setTotalDiscount(value);
      }
    }
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <PurchasingListItem
          isEditable={false}
          style={styles.purchasingListItem}
          purchasingProducts={purchasingProducts}
          onEditSelectedPurchasingProduct={productInfo =>
            onEditSelectedPurchasingProduct(productInfo)
          }
        />
      </View>
      <View style={styles.bodyPane}>
        <View style={styles.fieldPane}>
          <Text style={styles.fieldTitle}>discount</Text>
          <TextInput
            placeholder='0'
            value={totalDiscount}
            onChangeText={text => onChange('on-change-discount', text)}
          />
        </View>
        <Separator vertical={0.5} />
        <View style={styles.fieldPane}>
          <Text style={styles.fieldTitle}>total price</Text>
          <Text style={styles.fieldValue}>
            ₱{onSumAllProducts(purchasingProducts, totalDiscount)}
          </Text>
        </View>
      </View>
      <View style={styles.bottomPane}>
        <Button
          title='Purchase'
          skin={styles.button}
          onPress={() => onClick('on-click-purchase')}
        />
        <Separator horizontal={1} />
        <Button title='Cancel' skin={styles.button} onPress={onCancel} />
      </View>
    </View>
  );
}
