import {useContext, useEffect, useState} from 'react';
import {Button, Picker, Separator, Text, TextInput, View} from 'components';
import {Toast} from 'context';
import Formatter from 'utils/Formatter';
import useHook, {productMain as productMainReducer, productMainInitState} from 'hooks';
import {hasLength, isOnlyAlphabet, isOnlyNumber} from 'utils/checker';
import styles from './.module.css';
import {accentColor, accentColorDisabled} from 'constants/styles';

export default function Main({
  productInfo = {},
  type,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const {name, based, hot_price, cold_price} = productInfo;

  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useHook(
    productMainInitState({
      name,
      based,
      hot_price,
      cold_price,
    }),
    productMainReducer,
  );
  const [isChange, setIsChange] = useState(false);

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
      onCancel();
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
  };
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

    let info = state;
    info.date_modified = new Date().getTime();
    info.hot_price = hasLength(state.hot_price) ? parseFloat(state.hot_price) : null;
    info.cold_price = hasLength(state.cold_price) ? parseFloat(state.cold_price) : null;

    return {
      isClean: true,
      info,
    };
  };

  const onChange = (actionType, value) => {
    if (actionType === 'on-change-product-name') {
      if (isOnlyAlphabet(value) || value.length === 0) {
        setState({type: 'set', name: value});
      }
      return;
    }
    if (actionType === 'on-change-hot-price') {
      if (isOnlyNumber(value) || value.length === 0) {
        setState({type: 'set', hot_price: value});
      }
      return;
    }

    if (actionType === 'on-change-cold-price') {
      if (isOnlyNumber(value) || value.length === 0) {
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
      (cold_price ? String(cold_price) : '') !== state.cold_price
    ) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };
  useEffect(changeListener, [state]);

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
        <Picker
          items={['coffee', 'non-coffee']}
          selected={state.based}
          onSelected={item => onClick('on-select-based', item)}
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
                backgroundColor: isChange ? accentColor : accentColorDisabled,
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
