import {Button, Separator, Text, View} from 'components';
import {NUMBER_REGEX} from 'constants/regex';
import {SET_LOADING} from 'modules/actions';
import {useState} from 'react';
import {connect} from 'react-redux';
import Formatter from 'utils/Formatter';
import {sumOfPrice} from 'utils/helper';
import PurchasingListItem from '../../components/PurchasingListItem';

import styles from './.module.css';
import TextInput from './TextInput';

function Details({
  onPurchase,
  onCancel,
  purchasingProducts,
  onEditSelectedPurchasingProduct,
  dispatch,
  loading,
}) {
  const [totalDiscount, setTotalDiscount] = useState('');
  const [reciptient, setRecipient] = useState('');

  const getPurchasingProduct = (products = []) => {
    let temp_products = {
      date_created: new Date().getTime(),
      discount: parseInt(totalDiscount || 0) || 0,
      receiptTo: reciptient || null,
      products: [],
    };

    temp_products.products = products.map(item => {
      let addons_price = 0;
      let addons = [];
      item.addons.forEach(addon => {
        addons_price += addon.price;
        addons.push(addon._id);
      });
      return {
        _id_product: item._id,
        type: item.type,
        discount: parseInt(item.discount),
        price: addons_price + item.price,
        addons,
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
      dispatch(SET_LOADING({status: true}));
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
      return;
    }
    if (actionType === 'on-change-receipt') {
      setRecipient(value);
      return;
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
          <Text style={styles.fieldTitle}>receipt to</Text>
          <TextInput
            skin={styles.receipt}
            placeholder='@gmail.com'
            value={reciptient}
            onChangeText={text => onChange('on-change-receipt', text)}
          />
        </View>
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
            ₱{Formatter.toMoney(onSumAllProducts(purchasingProducts, totalDiscount))}
          </Text>
        </View>
      </View>
      <View style={styles.bottomPane}>
        <Button
          title='Purchase'
          skin={styles.button}
          isLoading={loading.status}
          onPress={() => onClick('on-click-purchase')}
        />
        <Separator horizontal={1} />
        <Button title='Cancel' skin={styles.button} onPress={onCancel} />
      </View>
    </View>
  );
}

const stateProps = ({loading}) => ({loading});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(Details);
