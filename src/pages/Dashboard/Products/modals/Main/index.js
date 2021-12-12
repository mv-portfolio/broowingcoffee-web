import {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Separator, Text, TextInput, View, Icon} from 'components';
import {Toast, SecondaryDialog} from 'context';
import * as Formatter from 'utils/Formatter';
import useHook, {productMain as productMainReducer, productMainInitState} from 'hooks';
import {ACCENT_COLOR, ACCENT_COLOR_DISABLED, BACKGROUND_COLOR} from 'constants/colors';
import {isName, isDouble} from 'utils/checker';
import {isConsumableChange} from 'utils/helper';
import styles from './.module.css';
import ItemList from '../../components/ItemList';
import Item from '../Item';

export default function Main({
  productInfo = {},
  type,
  inventory,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const {name, based, hot_price, cold_price, consumables = []} = productInfo;

  const {onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog} =
    useContext(SecondaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useHook(
    productMainInitState({
      name,
      based,
      hot_price,
      cold_price,
      consumables,
    }),
    productMainReducer,
  );

  const [isChange, setIsChange] = useState(false);

  const onClean = state => {
    if (state.name.length === 0) {
      return {isClean: false};
    }
    if (state.based.length === 0) {
      return {isClean: false};
    }
    if (state.hot_price.length === 0 && state.cold_price.length === 0) {
      return {isClean: false};
    }
    if (state.consumables.length === 0) {
      return {isClean: false};
    }

    let info = state;
    info.date_modified = new Date().getTime();
    info.hot_price = state.hot_price ? parseFloat(state.hot_price) : null;
    info.cold_price = state.cold_price ? parseFloat(state.cold_price) : null;

    info.consumables = state.consumables.map(consumable => ({
      consumed: consumable.consumed,
      _id_item: {
        _id: consumable._id_item._id,
        name: consumable._id_item.name,
      },
    }));

    return {
      isClean: true,
      info: {
        name: info.name,
        based: info.based,
        hot_price: info.hot_price,
        cold_price: info.cold_price,
        date_modified: info.date_modified,
        consumables: info.consumables,
      },
    };
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-select-based') {
      setState({type: 'set', based: value});
      return;
    }
    if (actionType === 'on-click-add') {
      const product = onClean(state);
      if (!product.isClean) {
        onShowToast('Please fill up all fields');
        return;
      }
      onAdd(product.info);
      onCancel();
      return;
    }
    if (actionType === 'on-click-update') {
      const product = onClean(state);
      if (!product.isClean) {
        onShowToast('Please fill up all fields');
        return;
      }
      onUpdate(product.info);
      return;
    }
    if (actionType === 'on-click-delete') {
      onDelete(value);
      return;
    }
    if (actionType === 'on-click-cancel') {
      onCancel();
      return;
    }
    if (actionType === 'on-click-add-consumables') {
      onShowSecondaryDialog(
        <Item
          items={inventory}
          onAdd={item => onClick('on-push-consumables', item)}
          onCancel={onHideSecondaryDialog}
        />,
      );
      return;
    }
    if (actionType === 'on-push-consumables') {
      setState({type: 'push-consumable', consumable: value});
      onHideSecondaryDialog();
      return;
    }
    if (actionType === 'on-pop-consumables') {
      setState({type: 'pop-consumable', consumableName: value});
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-product-name') {
      if (isName(value) || value.length === 0) {
        setState({type: 'set', name: value});
      }
      return;
    }
    if (actionType === 'on-change-hot-price') {
      if (isDouble(value) || value.length === 0) {
        setState({type: 'set', hot_price: value});
      }
      return;
    }

    if (actionType === 'on-change-cold-price') {
      if (isDouble(value) || value.length === 0) {
        setState({type: 'set', cold_price: value});
      }
      return;
    }
  };

  const changeListener = () => {
    if (
      name !== state.name ||
      based !== state.based ||
      (hot_price ? String(hot_price) : '') !== state.hot_price ||
      (cold_price ? String(cold_price) : '') !== state.cold_price ||
      isConsumableChange(consumables, state.consumables)
    ) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };
  useEffect(changeListener, [name, based, hot_price, cold_price, state]);

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>{`${Formatter.toName(type)} Product`}</Text>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Product</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='Name'
          value={state.name}
          disabled={type !== 'add'}
          defaultStyle={{
            boxShadow:
              type === 'add' ? '0.25vh 0.25vh 0.25vh rgba(0, 0, 0, 0.25)' : 'none',
          }}
          onChangeText={text => onChange('on-change-product-name', text)}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Based</Text>
        <Separator vertical={0.25} />
        <Dropdown
          items={['coffee', 'non-coffee']}
          selected={state.based}
          onSelected={item => onClick('on-select-based', item)}
          style={styles.dropdown}
          ACCENT_COLOR={BACKGROUND_COLOR}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Hot Price</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0.00'
          value={state.hot_price}
          onChangeText={text => onChange('on-change-hot-price', text)}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Cold Price</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0.00'
          value={state.cold_price}
          onChangeText={text => onChange('on-change-cold-price', text)}
        />
        <Separator vertical={1} />
        <View style={styles.inventoryPane}>
          <Text style={styles.subtitle}>Consume to Inventory</Text>
          <Button
            skin={styles.buttonAdd}
            onPress={() => onClick('on-click-add-consumables')}>
            <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='2.5vh' />
          </Button>
        </View>
        <Separator vertical={0.25} />
        <ItemList
          items={state.consumables}
          onRemove={itemName => onClick('on-pop-consumables', itemName)}
        />
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        {type === 'add' && (
          <Button
            title='Add'
            skin={styles.button}
            onPress={() => onClick('on-click-add', state)}
          />
        )}
        {type !== 'add' && (
          <>
            <Button
              title='Update'
              skin={styles.button}
              disabled={!isChange}
              defaultStyle={{
                BACKGROUND_COLOR2: isChange ? ACCENT_COLOR : ACCENT_COLOR_DISABLED,
              }}
              onPress={() => onClick('on-click-update')}
            />
            <Separator horizontal={1} />
            <Button
              title='Delete'
              skin={styles.buttonDelete}
              onPress={() => onClick('on-click-delete', productInfo.name)}
            />
          </>
        )}
        <Separator horizontal={1} />
        <Button
          title='Cancel'
          skin={styles.button}
          onPress={() => onClick('on-click-cancel')}
        />
      </View>
    </View>
  );
}
