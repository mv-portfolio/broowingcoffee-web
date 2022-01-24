import {useContext, useEffect, useReducer, useRef, useState} from 'react';
import {Button, Dropdown, Separator, Text, TextInput, View} from 'components';
import {
  dialogPurchasing as reducerDialogPurchasing,
  dialogPurchasingInitState,
} from 'hooks';
import Formatter from 'utils/Formatter';
import styles from './.module.css';
import {connect} from 'react-redux';
import {
  getDiscountObj,
  getDiscounts,
  getProductConsumed,
  getProductPrice,
  getSpecificProperty,
} from 'utils/helper';
import {Toast} from 'context';
import {ACCENT_COLOR, ACCENT_COLOR_DISABLED, BACKGROUND_COLOR} from 'constants/colors';
import {isInteger} from 'utils/checker';

function PrePurchase({
  type,
  discounts: {discounts},
  product = {},
  purchasingProducts = [],
  purchasingProduct = {},
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const {name, based} = product;

  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useReducer(
    reducerDialogPurchasing,
    dialogPurchasingInitState(purchasingProduct),
  );
  const [isChange, setChange] = useState(false);
  const spinner = useRef(null);

  const onClean = state => {
    const isProductExist = getProductConsumed(
      state.size,
      state.product_type,
      product.consumed,
    ).price;
    if (!state.product_type || !state.size || !state.numAvail) {
      return {
        status: false,
        error: 'Please fill all the inputs',
      };
    }
    if (!isProductExist) {
      return {
        status: false,
        error: `${Formatter.toName(product.name)} ${state.product_type} with size ${
          state.size
        } product does not exist`,
      };
    }

    let payload = state;
    payload.numAvail = parseInt(state.numAvail);
    payload.price = parseFloat(parseFloat(state.price ? state.price : '0').toFixed(2));
    payload._id_product = getSpecificProperty(['_id', 'name', 'based'], product);

    return {
      status: true,
      payload,
    };
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-click-add') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onShowToast(isClean.error);
        return;
      }
      onAdd({
        ...isClean.payload,
        id: purchasingProducts.length + 1,
      });
      return;
    }
    if (actionType === 'on-click-update') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onShowToast(isClean.error);
        return;
      }
      onUpdate({...isClean.payload, id: purchasingProduct.id});
      return;
    }
    if (actionType === 'on-click-delete') {
      onDelete({
        ...state,
        id: purchasingProduct.id,
        _id_product: getSpecificProperty(['_id', 'name', 'based'], product),
      });
      return;
    }
    if (actionType === 'on-select-size') {
      const price = getProductPrice(product, state.product_type, value);
      setState({type: 'set', size: value, price});
      return;
    }
    if (actionType === 'on-select-type') {
      const price = getProductPrice(product, value, state.size);
      setState({type: 'set', product_type: value, price});
      return;
    }
    if (actionType === 'on-select-discount') {
      const discount = getDiscountObj(discounts, value);
      setState({type: 'set', discount});
      return;
    }
    if (actionType === 'on-click-deduct-numbers-of-purchase') {
      if (parseInt(state.numAvail) > 1) {
        setState({type: 'set', numAvail: `${parseInt(state.numAvail) - 1}`});
      }
      return;
    }
    if (actionType === 'on-click-add-numbers-of-purchase') {
      if (parseInt(state.numAvail) < 99) {
        setState({
          type: 'set',
          numAvail: `${parseInt(state.numAvail) ? parseInt(state.numAvail) + 1 : '1'}`,
        });
      }
      return;
    }
  };

  const changeListener = () => {
    if (type !== 'add') {
      const {discount, product_type, size} = purchasingProduct;
      if (discount.name !== state.discount.name) {
        setChange(true);
        return;
      }
      if (product_type !== state.product_type || size !== state.size) {
        setChange(true);
        return;
      }
      setChange(false);
    }
  };
  const activeControlListener = () => {
    if (document.activeElement !== spinner && !state.numAvail) {
      setState({type: 'set', numAvail: '1'});
    }
  };
  useEffect(changeListener, [state]);
  useEffect(activeControlListener, [document.activeElement]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.titlePane}>
          <Text style={styles.title}>{Formatter.toName(name)}</Text>
          <Text style={styles.subtitle}>{`${String(based).toUpperCase()}`}</Text>
        </View>
        <></>
      </View>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <View style={styles.inputPane}>
          <View style={styles.dropdownPane}>
            <Text style={styles.label}>Type</Text>
            <Separator vertical={0.25} />
            <Dropdown
              style={styles.dropdown}
              accentColor={BACKGROUND_COLOR}
              items={['hot', 'cold']}
              selected={state.product_type}
              onSelected={type => onClick('on-select-type', type)}
            />
          </View>
          <View style={styles.dropdownPane}>
            <Text style={styles.label}>Size</Text>
            <Separator vertical={0.25} />
            <Dropdown
              style={styles.dropdown}
              accentColor={BACKGROUND_COLOR}
              items={['small', 'medium', 'large']}
              selected={state.size}
              onSelected={size => onClick('on-select-size', size)}
            />
          </View>
        </View>
        <Separator vertical={0.75} />
        <Text style={styles.label}>Discounts</Text>
        <Separator vertical={0.25} />
        <Dropdown
          style={styles.dropdownDiscount}
          accentColor={BACKGROUND_COLOR}
          items={getDiscounts(discounts)}
          selected={
            type !== 'add'
              ? state.discount.value
                ? `${state.discount.name} ${state.discount.value}`
                : 'none'
              : state.discount.value
              ? null
              : 'none'
          }
          onSelected={discount => onClick('on-select-discount', discount)}
        />
        <Separator vertical={0.75} />
        <Text style={styles.label}>Price</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          disabled={true}
          defaultStyle={{boxShadow: 'none'}}
          placeholder='0'
          value={
            state.discount.value
              ? state.price - (state.discount.value / 100) * state.price
              : state.price
          }
        />
        {type === 'add' && (
          <>
            <Separator vertical={0.75} />
            <Text style={styles.label}>Numbers of purchase</Text>
            <Separator vertical={0.25} />
            <View style={styles.counterPane}>
              <Button
                skin={styles.buttonCounter}
                titleStyle={styles.buttonCounterText}
                title='-'
                onPress={() => onClick('on-click-deduct-numbers-of-purchase')}
              />
              <input
                ref={spinner}
                className={styles.counterText}
                placeholder='1'
                value={state.numAvail}
                onChange={({target: {value}}) => {
                  if (
                    parseInt(value ? value : '0') < 100 &&
                    isInteger(value ? value : '0') &&
                    value !== '0'
                  ) {
                    setState({type: 'set', numAvail: value});
                  }
                }}
              />
              <Button
                skin={styles.buttonCounter}
                titleStyle={styles.buttonCounterText}
                title='+'
                onPress={() => onClick('on-click-add-numbers-of-purchase')}
              />
            </View>
          </>
        )}
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        {type === 'add' && (
          <Button
            title='Add'
            skin={styles.button}
            onPress={() => onClick('on-click-add')}
          />
        )}
        {type !== 'add' && (
          <>
            <Button
              title='Update'
              skin={styles.button}
              disabled={!isChange}
              defaultStyle={{
                backgroundColor: isChange ? ACCENT_COLOR : ACCENT_COLOR_DISABLED,
              }}
              onPress={() => onClick('on-click-update')}
            />
            <Separator horizontal={1} />
            <Button
              title='Delete'
              skin={styles.buttonDelete}
              onPress={() => onClick('on-click-delete')}
            />
          </>
        )}
        <Separator horizontal={1} />
        <Button title='Cancel' skin={styles.button} onPress={onCancel} />
      </View>
    </View>
  );
}

const stateProps = ({purchasingProducts, discounts}) => ({
  purchasingProducts,
  discounts,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(PrePurchase);
