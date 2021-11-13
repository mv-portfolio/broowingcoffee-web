import {useContext, useEffect, useState} from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {Button, Picker, Separator, Text, TextInput, View} from 'components';
import {accentColor, accentColorDisabled} from 'constants/styles';
import {Toast} from 'context';
import useHook, {itemInitState, item as itemReducer} from 'hooks';
import {isName, isInteger, isDouble} from 'utils/checker';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

export default function Item({
  type,
  productInfo = {},
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const {name, cost, type: itemType, quantity, date_expired} = productInfo;
  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useHook(
    itemInitState({name, cost, itemType, quantity, date_expired}),
    itemReducer,
  );
  // const [startDate, setStartDate] = useState(new Date());
  const [isChange, setIsChange] = useState(false);

  const onClean = state => {
    if (state.name.length === 0) {
      return {isClean: false};
    }
    if (state.itemType.length === 0) {
      return {isClean: false};
    }
    if (state.cost.length === 0) {
      return {isClean: false};
    }
    if (state.quantity.length <= 0) {
      return {isClean: false};
    }

    let info = state;
    info.cost = parseFloat(info.cost);
    info.quantity = parseInt(info.quantity);
    info.date_expired = null;
    info.date_modified = new Date().getTime();

    return {
      isClean: true,
      info,
    };
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-click-add') {
      const item = onClean(state);
      if (!item.isClean) {
        onShowToast('Please fill up all fields');
        return;
      }
      onAdd(item.info);
      onCancel();
      return;
    }
    if (actionType === 'on-click-update') {
      const item = onClean(state);
      if (!item.isClean) {
        onShowToast('Please fill up all fields');
        return;
      }
      onUpdate(item.info);
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
    if (actionType === 'on-select-item-type') {
      setState({type: 'set', itemType: value});
      return;
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-name') {
      if (isName(value) || value.length === 0) {
        setState({type: 'set', name: value});
      }
      return;
    }
    if (actionType === 'on-change-quantity') {
      if (isInteger(value) || value.length === 0) {
        setState({type: 'set', quantity: value});
      }
      return;
    }
    if (actionType === 'on-change-cost') {
      if (isDouble(value) || value.length === 0) {
        setState({type: 'set', cost: value});
      }
      return;
    }
  };

  const changeListener = () => {
    if (
      name !== state.name ||
      itemType !== state.itemType ||
      String(quantity) !== state.quantity ||
      String(cost) !== state.cost ||
      date_expired !== state.date_expired
    ) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };
  useEffect(changeListener, [name, itemType, quantity, cost, date_expired, state]);

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>{`${Formatter.toName(type)} Item`}</Text>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Item</Text>
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
        <Separator vertical={1} />
        <Text style={styles.titleField}>Type</Text>
        <Separator vertical={0.25} />
        <Picker
          items={['material']} // ['material', 'ingredient']
          selected={state.itemType}
          onSelected={item => onClick('on-select-item-type', item)}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Quantity</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0 pcs'
          value={state.quantity}
          onChangeText={text => onChange('on-change-quantity', text)}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Cost</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0.00'
          value={state.cost}
          onChangeText={text => onChange('on-change-cost', text)}
        />
        {/* <Separator vertical={1} />
        <DatePicker da className={styles.datePicker} selected={startDate} onChange={date => setStartDate(date)} /> */}
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
