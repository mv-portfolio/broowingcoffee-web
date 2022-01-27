import {useContext, useReducer} from 'react';
import {Button, Separator, View} from 'components';
import Text from 'components/Text';
import {
  dialogPrePurchasing as reducerDialogPrePurchasing,
  dialogPrePurchasingInitState,
} from 'hooks';
import {isDouble} from 'utils/checker';
import {onComputePurchasingProducts} from 'utils/helper';
import Formatter from 'utils/Formatter';
import {Toast} from 'context';

import PurchasingListItem from '../../components/PurchasingListItem';
import styles from './.module.css';
import {connect} from 'react-redux';

function PrePurchasing({user, purchasingProducts = [], onPurchase, onCancel}) {
  const {onShow: onshowToast} = useContext(Toast);
  const [state, setState] = useReducer(
    reducerDialogPrePurchasing,
    dialogPrePurchasingInitState,
  );

  const onClean = state => {
    if (!state.cash) {
      return {
        status: false,
        error: 'Please enter the cash of customer',
      };
    }

    let payload = {};
    payload.receipt_to = state.receiptTo;
    payload.cash = parseFloat(state.cash);
    payload.products = purchasingProducts;
    payload.issued_by = `${user.firstname} ${user.lastname}`;
    payload.date_created = new Date().getTime();

    return {
      status: true,
      payload,
    };
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-click-purchase') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onshowToast(isClean.error);
        return;
      }
      onPurchase(isClean.payload);
      return;
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-receipt-to') {
      setState({type: 'set', receiptTo: value});
      return;
    }
    if (actionType === 'on-change-cash' && isDouble(value ? value : '0')) {
      const change =
        parseFloat(value ? value : '0') - onComputePurchasingProducts(purchasingProducts);
      setState({type: 'set', cash: value, change: `${change}`});
      return;
    }
  };

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Invoice</Text>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <PurchasingListItem
          style={styles.purchasingList}
          purchasingProducts={purchasingProducts}
          editable={false}
        />
        <Separator vertical={1.5} />
        <View style={styles.inputPane}>
          <Text style={styles.inputLabel}>Receipt to</Text>
          <input
            className={styles.input}
            placeholder='@email.com'
            value={state.receiptTo}
            onChange={({target: {value}}) => onChange('on-change-receipt-to', value)}
          />
        </View>
        <View style={styles.inputPane}>
          <Text style={styles.inputLabel}>Cash</Text>
          <input
            className={styles.input}
            style={{letterSpacing: '0.2vh'}}
            placeholder='0.00'
            value={state.cash}
            onChange={({target: {value}}) => onChange('on-change-cash', value)}
          />
        </View>
        <View style={styles.inputPane}>
          <Text style={styles.inputLabel}>Change</Text>
          <input
            className={styles.input}
            disabled={true}
            style={{letterSpacing: '0.2vh'}}
            placeholder='0'
            value={Formatter.toMoney(state.change)}
          />
        </View>
        <View style={styles.inputPane}>
          <Text style={styles.inputLabel}>Total price</Text>
          <input
            className={styles.input}
            disabled={true}
            style={{fontWeight: 'bold', letterSpacing: '0.2vh'}}
            placeholder='0'
            value={Formatter.toMoney(onComputePurchasingProducts(purchasingProducts))}
          />
        </View>
      </View>
      <Separator vertical={1} />
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

const stateProps = ({user}) => ({
  user,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(PrePurchasing);
