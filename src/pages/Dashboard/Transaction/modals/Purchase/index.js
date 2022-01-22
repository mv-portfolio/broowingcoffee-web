import {useContext, useEffect, useState} from 'react';
import {View, Text, Separator, TextInput, Dropdown, Button} from 'components';
import useHook, {purchasingProduct, purchasingProductInitState} from 'hooks';
import Checklist from 'components/Checklist';
import {arrayFind, isInteger} from 'utils/checker';
import Formatter from 'utils/Formatter';
import Generator from 'utils/Generator';
import {Toast} from 'context';

import styles from './.module.css';
import {ACCENT_COLOR, ACCENT_COLOR_DISABLED, BACKGROUND_COLOR} from 'constants/colors';

export default function Purchase({
  type,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
  productInfo,
  initAddons = [],
}) {
  const {
    _id,
    id,
    name,
    based,
    hot_price,
    cold_price,
    discount,
    price,
    type: tempType,
    addons,
  } = productInfo;

  const {onShow: onShowToast} = useContext(Toast);
  const [state, setState] = useHook(
    purchasingProductInitState({discount, price, tempType, addons}),
    purchasingProduct,
  );
  const [isChange, setIsChange] = useState(false);

  const getPickerItems = (hot_price, cold_price) => {
    let items = ['hot', 'cold'];

    if (!hot_price) {
      items = items.filter(item => item !== 'hot');
    }
    if (!cold_price) {
      items = items.filter(item => item !== 'cold');
    }
    return items;
  };
  const getProduct = state => {
    let productInfo = {
      _id,
      id: id || Generator.getInvoiceId(),
      name,
      price: hot_price ? parseFloat(hot_price) : 0,
      discount: state.discount ? parseInt(state.discount) : 0,
      based,
      type: state.tempType,
      addons: state.addons || [],
      hot_price,
      cold_price,
    };
    if (state.tempType === 'cold') {
      productInfo.price = cold_price;
    }
    return productInfo;
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-select-type') {
      setState({type: 'set', tempType: value});
      return;
    }
    if (actionType === 'on-select-addons') {
      setState({type: 'set', addons: [...value]});
      return;
    }
    if (actionType === 'on-click-add') {
      const product = getProduct(state);
      if (product.type.length === 0) {
        onShowToast('Please fill up all the inputs');
        return;
      }
      onAdd(product);
      onCancel();
      return;
    }
    if (actionType === 'on-click-update') {
      const updatedProduct = getProduct(state);
      onUpdate(updatedProduct);
      onCancel();
      return;
    }
    if (actionType === 'on-click-delete') {
      onDelete(id);
      onCancel();
      return;
    }
    if (actionType === 'on-click-cancel') {
      onCancel();
      return;
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-discount') {
      let val = parseInt(value);
      if ((isInteger(value) && val <= 100 && val >= 0) || value.length === 0) {
        setState({type: 'set', discount: value});
      }
    }
  };

  const isAddonsChange = (prevArr = [], currentArr = []) => {
    let isChange = false;
    if (prevArr.length !== currentArr.length) {
      return true;
    }
    prevArr.forEach(prev => {
      if (!arrayFind(currentArr, cur => cur.name === prev.name)) {
        isChange = true;
      }
    });
    return isChange;
  };
  const changeListener = () => {
    if (type === 'edit') {
      if (
        (discount ? String(discount) : '') !== state.discount ||
        tempType !== state.tempType ||
        isAddonsChange(addons, state.addons)
      ) {
        setIsChange(true);
        return;
      }
      setIsChange(false);
    }
  };

  useEffect(changeListener, [type, addons, discount, tempType, state]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>{Formatter.toName(name)}</Text>
        <Text style={styles.subtitle}>{based}</Text>
      </View>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Discounts(%)</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0'
          value={state.discount}
          onChangeText={text => onChange('on-change-discount', text)}
        />
        <Separator vertical={0.75} />
        <Text style={styles.titleField}>Type</Text>
        <Separator vertical={0.25} />
        <Dropdown
          items={getPickerItems(hot_price, cold_price)}
          selected={state.tempType}
          onSelected={value => onClick('on-select-type', value)}
          style={styles.dropdown}
          accentColor={BACKGROUND_COLOR}
        />
        <Separator vertical={0.75} />
        <Text style={styles.titleField}>Price</Text>
        <Separator vertical={0.25} />
        <TextInput
          disabled={true}
          placeholder='0.00'
          value={
            state.tempType ? (state.tempType === 'hot' ? hot_price : cold_price) : ''
          }
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Add-ons</Text>
        <Separator vertical={0.25} />
        <Checklist
          items={initAddons}
          currentSelectedItems={state.addons}
          onSelectedItems={selectedItems => onClick('on-select-addons', selectedItems)}
        />
      </View>
      <View style={styles.bottomPane}>
        {type === 'add' && (
          <Button
            skin={styles.button}
            title='Add'
            onPress={() => onClick('on-click-add')}
          />
        )}
        {type !== 'add' && (
          <>
            <Button
              skin={styles.button}
              disabled={!isChange}
              defaultStyle={{
                BACKGROUND_COLOR2: isChange ? ACCENT_COLOR : ACCENT_COLOR_DISABLED,
              }}
              title='Update'
              onPress={() => onClick('on-click-update')}
            />
            <Separator horizontal={1} />
            <Button
              skin={styles.buttonDelete}
              title='Delete'
              onPress={() => onClick('on-click-delete')}
            />
          </>
        )}
        <Separator horizontal={1} />
        <Button
          skin={styles.button}
          title='Cancel'
          onPress={() => onClick('on-click-cancel')}
        />
      </View>
    </View>
  );
}
