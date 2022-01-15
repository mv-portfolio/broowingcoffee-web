import {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Separator, Text, TextInput, View} from 'components';
import {ACCENT_COLOR, ACCENT_COLOR_DISABLED, BACKGROUND_COLOR} from 'constants/colors';
import {Toast} from 'context';
import useHook, {itemInitState, item as itemReducer} from 'hooks';
import {isName, isInteger, isDouble} from 'utils/checker';
import Formatter from 'utils/Formatter';
import styles from './.module.css';
import {connect} from 'react-redux';
import {CLEAR_LOADING} from 'ducks/actions';

function Item({
  loading,
  dispatch,
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
  const [isChange, setIsChange] = useState(false);

  const onClean = state => {
    if (state.name.length === 0) {
      return {isClean: false};
    }
    // if (state.itemType.length === 0) {
    //   return {isClean: false};
    // }
    if (state.cost.length === 0) {
      return {isClean: false};
    }
    if (state.quantity.length <= 0) {
      return {isClean: false};
    }

    let info = {};
    info.name = state.name;
    info.type = state.itemType;
    info.quantity = parseInt(state.quantity);
    info.cost = parseFloat(state.cost);
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
        onShowToast('Please fill up all the inputs');
        return;
      }
      onAdd(item.info);
      return;
    }
    if (actionType === 'on-click-update') {
      const item = onClean(state);
      if (!item.isClean) {
        onShowToast('Please fill up all the inputs');
        return;
      }
      onUpdate(item.info);
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
      quantity !== parseInt(state.quantity ? state.quantity : '0') ||
      cost !== parseInt(state.cost ? state.cost : '0') ||
      date_expired !== state.date_expired
    ) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };
  const requestListener = () => {
    if (!loading.status && loading.message === 'done') {
      dispatch(CLEAR_LOADING());
      onCancel();
    }
  };
  useEffect(changeListener, [name, itemType, quantity, cost, date_expired, state]);
  useEffect(requestListener, [loading]);

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
        {/* <Separator vertical={1} />
        <Text style={styles.titleField}>Type</Text>
        <Separator vertical={0.25} />
        <Dropdown
          items={['Non-Perishable']} // ['material', 'ingredient']
          hideIcon
          selected={state.itemType}
          onSelected={item => onClick('on-select-item-type', item)}
          style={styles.dropdown}
          ACCENT_COLOR={BACKGROUND_COLOR}
        /> */}
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
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        {type === 'add' && (
          <Button
            title='Add'
            skin={styles.button}
            isLoading={loading.status}
            onPress={() => onClick('on-click-add')}
          />
        )}
        {type !== 'add' && (
          <>
            <Button
              title='Update'
              skin={styles.button}
              disabled={!isChange}
              isLoading={loading.status}
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
          disabled={loading.status}
          onPress={() => onClick('on-click-cancel')}
        />
      </View>
    </View>
  );
}

const stateProps = ({loading}) => ({
  loading,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(Item);
