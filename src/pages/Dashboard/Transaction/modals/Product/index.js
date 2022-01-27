import {useContext, useEffect, useReducer, useRef, useState} from 'react';
import {Button, Dropdown, Separator, Text, TextInput, View} from 'components';
import {
  dialogPurchasingProduct as reducerDialogPurchasingProduct,
  dialogPurchasingProductInitState,
} from 'hooks';
import Formatter from 'utils/Formatter';
import styles from './.module.css';
import {connect} from 'react-redux';
import {
  getDiscountObj,
  getDiscounts,
  getInitialProductCombination,
  getProductConsumed,
  getProductPrice,
  getSpecificProperty,
} from 'utils/helper';
import {Toast} from 'context';
import {ACCENT_COLOR, ACCENT_COLOR_DISABLED, BACKGROUND_COLOR} from 'constants/colors';
import {isInteger} from 'utils/checker';
import ProductType from './components/ProductType';
import Size from './components/Size';

function Product({
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
  const {name, based, consumed} = product;

  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useReducer(
    reducerDialogPurchasingProduct,
    dialogPurchasingProductInitState(purchasingProduct),
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
    if (actionType === 'on-select-product-type') {
      const price = getProductPrice(product, value, state.size);
      setState({type: 'set', product_type: value, price});
      return;
    }
    if (actionType === 'on-select-size') {
      const price = getProductPrice(product, state.product_type, value);
      setState({type: 'set', size: value, price});
      return;
    }
    if (actionType === 'on-select-discount') {
      const _id_discount = getDiscountObj(discounts, value);
      setState({type: 'set', _id_discount});
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
      const {_id_discount, product_type, size} = purchasingProduct;
      if (_id_discount.name !== state._id_discount.name) {
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
          <Separator vertical={0.5} />
          <Text style={styles.subtitle}>{`${String(based).toUpperCase()}`}</Text>
        </View>
        <></>
      </View>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.label}>Product Combination</Text>
        <Separator vertical={0.5} />
        <View style={styles.combinationPane}>
          <ProductType
            product={product}
            size={state.size ? state.size : getInitialProductCombination(consumed).size}
            selected={state.product_type}
            onSelect={productType => onClick('on-select-product-type', productType)}
          />
          <Separator horizontal={1} />
          <Size
            product={product}
            productType={
              state.product_type
                ? state.product_type
                : getInitialProductCombination(consumed).product_type
            }
            selected={state.size}
            onSelect={size => onClick('on-select-size', size)}
          />
        </View>
        <Separator vertical={1} />
        <Text style={styles.label}>Discounts</Text>
        <Separator vertical={0.5} />
        <Dropdown
          style={styles.dropdown}
          accentColor={BACKGROUND_COLOR}
          items={getDiscounts(discounts)}
          selected={
            type !== 'add'
              ? state._id_discount.value
                ? `${state._id_discount.name} (${state._id_discount.value}%)`
                : 'none'
              : state._id_discount.value
              ? null
              : 'none'
          }
          onSelected={discount => onClick('on-select-discount', discount)}
        />
        <Separator vertical={1} />
        <Text style={styles.label}>Price</Text>
        <Separator vertical={0.5} />
        <TextInput
          skin={styles.input}
          disabled={true}
          defaultStyle={{boxShadow: 'none'}}
          placeholder='0'
          value={
            state._id_discount.value
              ? state.price - (state._id_discount.value / 100) * state.price
              : state.price
          }
        />
        {type === 'add' && (
          <>
            <Separator vertical={1} />
            <Text style={styles.label}>Numbers of purchase</Text>
            <Separator vertical={0.5} />
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
export default connect(stateProps, dispatchProps)(Product);
