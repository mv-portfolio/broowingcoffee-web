import {useContext, useEffect, useReducer, useState} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Dropdown,
  Separator,
  Text,
  TextInput,
  View,
  Icon,
  Dialog,
} from 'components';
import {Toast, SecondaryDialog} from 'context';
import Formatter from 'utils/Formatter';
import {ACCENT_COLOR, ACCENT_COLOR_DISABLED, BACKGROUND_COLOR} from 'constants/colors';
import styles from './.module.css';
import {dialogProduct as dialogProductReducer, dialogProductInitState} from 'hooks';
import {isDouble, isInteger, isName} from 'utils/checker';
import {
  hp,
  getProductConsumed,
  hasMissingProperty,
  popInventoryProduct,
  setInventoryProduct,
  setProductConsumed,
  isConsumedChange,
  getBasesName,
} from 'utils/helper';
import ItemList from '../../components/ItemList';
import Items from '../Items';

function Product({
  loading,
  productBase: {bases},
  product = {},
  type,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const {name, based, size, type: product_type, price, consumed} = product;
  const {onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog} =
    useContext(SecondaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useReducer(
    dialogProductReducer,
    dialogProductInitState({name, based, size, product_type, price, consumed}),
  );
  const [isChange, setIsChange] = useState(false);

  const onClean = state => {
    if (!state.name || !state.based || !state.size || !state.product_type) {
      return {
        status: false,
        error: 'Please fill all the important inputs',
      };
    }

    const combProperty = hasMissingProperty(state.consumed);
    if (combProperty.status) return {status: false, error: combProperty.error};

    let payload = state;
    payload.consumed = state.consumed.map(consume => {
      return {
        ...consume,
        price: parseFloat(consume.price ? consume.price : '0'),
      };
    });
    payload.date_modified = new Date().getTime();

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
      onAdd(isClean.payload);
      return;
    }
    if (actionType === 'on-click-update') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onShowToast(isClean.error);
        return;
      }
      onUpdate({...isClean.payload, _id: product._id});
      return;
    }
    if (actionType === 'on-click-delete') {
      onDelete({...state, _id: product._id});
      return;
    }
    if (actionType === 'on-select-based') {
      setState({type: 'set', based: value});
      return;
    }
    if (actionType === 'on-select-size') {
      setState({type: 'set', size: value});
      return;
    }
    if (actionType === 'on-select-product-type') {
      setState({type: 'set', product_type: value});
      return;
    }
    if (actionType === 'on-click-add-cosumed-dialog') {
      onShowSecondaryDialog(
        <Items
          onAdd={item => onClick('on-click-add-consumed', item)}
          onCancel={onHideSecondaryDialog}
        />,
      );
      return;
    }
    if (actionType === 'on-click-add-consumed') {
      setState({
        type: 'set',
        consumed: setProductConsumed(
          {
            inventory: setInventoryProduct(
              getProductConsumed(state.size, state.product_type, state.consumed)
                .inventory,
              value,
            ),
          },
          state.size,
          state.product_type,
          state.consumed,
        ),
      });
      return;
    }
    if (actionType === 'on-click-delete-consumed') {
      setState({
        type: 'set',
        consumed: setProductConsumed(
          {
            inventory: popInventoryProduct(
              getProductConsumed(state.size, state.product_type, state.consumed)
                .inventory,
              value,
            ),
          },
          state.size,
          state.product_type,
          state.consumed,
        ),
      });
      return;
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-name' && isName(value)) {
      setState({type: 'set', name: value});
      return;
    }
    if (actionType === 'on-change-price' && isDouble(value ? value : '0')) {
      setState({
        type: 'set',
        consumed: setProductConsumed(
          {price: value},
          state.size,
          state.product_type,
          state.consumed,
        ),
      });
      return;
    }
  };

  const initListener = () => {
    if (type !== 'add') {
      setState({type: 'set', size: 'small', product_type: 'hot'});
    }
  };
  const changeListener = () => {
    if (based !== state.based || isConsumedChange(consumed, state.consumed)) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };
  useEffect(initListener, []);
  useEffect(changeListener, [state]);

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>{`${Formatter.toName(type)} Product`}</Text>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <Text style={styles.label}>Product</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='Name'
          disabled={type !== 'add'}
          defaultStyle={{
            boxShadow:
              type === 'add' ? '0.25vh 0.25vh 0.25vh rgba(0, 0, 0, 0.25)' : 'none',
          }}
          value={state.name}
          onChangeText={text => onChange('on-change-name', text)}
        />
        <Separator vertical={0.75} />
        <Text style={styles.label}>Based</Text>
        <Separator vertical={0.25} />
        <Dropdown
          items={getBasesName(bases)}
          style={styles.dropdown}
          accentColor={BACKGROUND_COLOR}
          selected={state.based}
          onSelected={item => onClick('on-select-based', item)}
        />
        <Separator vertical={0.75} />
        <View style={styles.inputsPane}>
          <View style={styles.inputPane}>
            <Text style={styles.label}>Type</Text>
            <Separator vertical={0.25} />
            <Dropdown
              items={['hot', 'cold']}
              style={styles.dropdown}
              accentColor={BACKGROUND_COLOR}
              selected={state.product_type}
              onSelected={item => onClick('on-select-product-type', item)}
            />
          </View>
          <Separator horizontal={1} />
          <View style={styles.inputPane}>
            <Text style={styles.label}>Size</Text>
            <Separator vertical={0.25} />
            <Dropdown
              items={['small', 'medium', 'large']}
              style={styles.dropdown}
              accentColor={BACKGROUND_COLOR}
              selected={state.size}
              onSelected={item => onClick('on-select-size', item)}
            />
          </View>
        </View>
        {state.size && state.product_type && (
          <>
            <Separator vertical={2} />
            <Text style={styles.labelBold}>Combination Property</Text>
            <Separator vertical={0.75} />
            <Text style={styles.label}>Price</Text>
            <Separator vertical={0.25} />
            <TextInput
              skin={styles.input}
              placeholder='0'
              value={
                getProductConsumed(state.size, state.product_type, state.consumed).price
                  ? getProductConsumed(state.size, state.product_type, state.consumed)
                      .price
                  : ''
              }
              onChangeText={text => onChange('on-change-price', text)}
            />
            <Separator vertical={0.5} />
            <View style={styles.titlePane}>
              <Text style={styles.label}>Consume to Inventory</Text>
              <Button
                skin={styles.buttonAddItem}
                onPress={() => onClick('on-click-add-cosumed-dialog')}>
                <Icon font='Feather' name='plus' size={hp(2)} color={ACCENT_COLOR} />
              </Button>
            </View>
            <Separator vertical={0.25} />
            <ItemList
              onRemove={item => onClick('on-click-delete-consumed', item)}
              items={getProductConsumed(
                state.size,
                state.product_type,
                state.consumed,
              ).inventory.sort(function (a, b) {
                if (a._id_item.name > b._id_item.name) return 1;
                if (a._id_item.name < b._id_item.name) return -1;
                return 0;
              })}
            />
          </>
        )}
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        {type === 'add' && (
          <Button
            title='Add'
            skin={styles.button}
            disabled={loading.status}
            onPress={() => onClick('on-click-add')}
          />
        )}
        {type !== 'add' && (
          <>
            <Button
              title='Update'
              skin={styles.button}
              disabled={loading.status || !isChange}
              defaultStyle={{
                backgroundColor: isChange ? ACCENT_COLOR : ACCENT_COLOR_DISABLED,
              }}
              onPress={() => onClick('on-click-update')}
            />
            <Separator horizontal={1} />
            <Button
              title='Delete'
              skin={styles.buttonDelete}
              disabled={loading.status}
              onPress={() => onClick('on-click-delete')}
            />
          </>
        )}
        <Separator horizontal={1} />
        <Button
          title='Cancel'
          skin={styles.button}
          disabled={loading.status}
          onPress={onCancel}
        />
      </View>
    </View>
  );
}

const stateProps = ({loading, productBase}) => ({
  loading,
  productBase,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(Product);
