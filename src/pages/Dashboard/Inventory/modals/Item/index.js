import {useContext, useEffect, useReducer, useState} from 'react';
import {
  Button,
  Dialog,
  Dropdown,
  Icon,
  Separator,
  Text,
  TextInput,
  View,
} from 'components';
import {
  ACCENT_COLOR,
  ACCENT_COLOR_DISABLED,
  BACKGROUND_COLOR,
  BACKGROUND_COLOR2,
  BACKGROUND_COLOR3,
  BACKGROUND_COLOR4,
  WHITE,
} from 'constants/colors';
import {SecondaryDialog, Toast} from 'context';
import {dialogItemInitState, dialogItem as dialogItemReducer} from 'hooks';
import {isName, isInteger, isDouble} from 'utils/checker';
import Formatter from 'utils/Formatter';
import styles from './.module.css';
import {connect} from 'react-redux';
import PerishableProperties from '../PerishableProperties';
import ItemConfig from '../ItemConfig';

function Item({loading, type, productInfo = {}, onAdd, onUpdate, onDelete, onCancel}) {
  const {
    name,
    brand,
    quantity,
    type: itemType,
    perishable_properties = {},
    restock_point,
    cost,
  } = productInfo;
  const {onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog} =
    useContext(SecondaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useReducer(
    dialogItemReducer,
    dialogItemInitState({
      name,
      brand,
      quantity,
      itemType,
      perishable_properties,
      restock_point,
      cost,
    }),
  );
  const [isChange, setIsChange] = useState(false);

  const onClean = state => {
    if (!state.name || !state.itemType || !state.cost || !state.quantity) {
      return {status: false, error: 'Please fill up all the inputs'};
    }
    if (state.itemType === 'perishable') {
      if (state.perishable_properties.expiry_date < new Date().getTime()) {
        return {status: false, error: `Expiry date must be ahead of today's date`};
      }
      if (
        !state.perishable_properties.unit ||
        !state.perishable_properties.current_unit ||
        !state.perishable_properties.unit_type ||
        !state.perishable_properties.expiry_date
      ) {
        return {status: false, error: 'Please enter all property needed in perishable'};
      }
      if (!state.perishable_properties.expire_point) {
        return {status: false, error: 'Please set the configuration for expire point'};
      }
    }
    if (!state.restock_point.low[0] || !state.restock_point.mid[1]) {
      return {status: false, error: 'Please set the configuration for restock point'};
    }

    let payload = {};
    payload.name = state.name;
    payload.brand = state.brand;
    payload.type = state.itemType;
    payload.quantity = parseInt(state.quantity);
    payload.cost = parseFloat(state.cost);
    payload.restock_point = state.restock_point;
    payload.perishable_properties =
      state.itemType === 'non-perishable' ? {} : state.perishable_properties;
    payload.date_modified = new Date().getTime();

    return {
      status: true,
      payload,
    };
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-click-add') {
      const item = onClean(state);
      if (!item.status) {
        onShowToast(item.error);
        return;
      }
      onAdd(item.payload);
      return;
    }
    if (actionType === 'on-click-update') {
      const item = onClean(state);
      if (!item.status) {
        onShowToast(item.error);
        return;
      }
      onUpdate(item.payload);
      return;
    }
    if (actionType === 'on-click-delete') {
      onDelete(state);
      return;
    }
    if (actionType === 'on-select-item-type') {
      setState({type: 'set', itemType: value});
      if (type !== 'add' && value === 'perishable') {
        setState({type: 'set', perishable_properties: state.perishable_properties});
      }
      return;
    }
    if (actionType === 'on-show-perishable-props-dialog') {
      onShowSecondaryDialog(
        <PerishableProperties
          type={type}
          perishableProperties={state.perishable_properties}
          onSave={perishableProps => onClick('on-save-perishable-props', perishableProps)}
          onCancel={onHideSecondaryDialog}
        />,
      );
      return;
    }
    if (actionType === 'on-save-perishable-props') {
      setState({
        type: 'set',
        perishable_properties: {...state.perishable_properties, ...value},
      });
    }
    if (actionType === 'on-show-item-config-dialog') {
      onShowSecondaryDialog(
        <ItemConfig
          itemType={state.itemType}
          perishableProperties={state.perishable_properties}
          restockPoint={state.restock_point}
          onSave={config => onClick('on-save-item-config', config)}
          onCancel={onHideSecondaryDialog}
        />,
        {disabledTouchOutside: false},
      );
      return;
    }
    if (actionType === 'on-save-item-config') {
      setState({
        type: 'set',
        restock_point: {low: [value.low], mid: [value.low, value.mid]},
        perishable_properties: {
          ...state.perishable_properties,
          expire_point: value.expire_point,
        },
      });
      return;
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-name') {
      setState({type: 'set', name: value});
      return;
    }
    if (actionType === 'on-change-brand' && isName(value)) {
      setState({type: 'set', brand: value});
      return;
    }
    if (actionType === 'on-change-quantity' && isInteger(value ? value : '0')) {
      setState({type: 'set', quantity: value});
      return;
    }
    if (actionType === 'on-change-cost' && isDouble(value ? value : '0')) {
      setState({type: 'set', cost: value});
      return;
    }
  };

  const changeListener = () => {
    if (
      name !== state.name ||
      brand !== state.brand ||
      itemType !== state.itemType ||
      quantity !== parseInt(state.quantity ? state.quantity : '0') ||
      cost !== parseInt(state.cost ? state.cost : '0') ||
      perishable_properties.unit !== state.perishable_properties.unit ||
      perishable_properties.current_unit !== state.perishable_properties.current_unit ||
      perishable_properties.unit_type !== state.perishable_properties.unit_type ||
      perishable_properties.expiry_date !== state.perishable_properties.expiry_date ||
      perishable_properties.expire_point !== state.perishable_properties.expire_point ||
      restock_point.low[0] !== state.restock_point.low[0] ||
      restock_point.mid[1] !== state.restock_point.mid[1]
    ) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };
  useEffect(changeListener, [state]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>{`${Formatter.toName(type)} Item`}</Text>
        <Button
          skin={styles.buttonConfigSkin}
          body={styles.buttonConfigBody}
          onPress={() => onClick('on-show-item-config-dialog')}>
          <Icon font='' />
          <Text style={styles.buttonConfigText}>CONFIG</Text>
        </Button>
      </View>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Item</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='name'
          disabled={type !== 'add'}
          defaultStyle={{
            boxShadow:
              type === 'add' ? '0.25vh 0.25vh 0.25vh rgba(0, 0, 0, 0.25)' : 'none',
          }}
          value={state.name}
          onChangeText={text => onChange('on-change-name', text)}
        />
        <Separator vertical={0.75} />
        <Text style={styles.titleField}>Brand</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='name'
          value={state.brand}
          onChangeText={text => onChange('on-change-brand', text)}
        />
        <Separator vertical={0.75} />
        <Text style={styles.titleField}>Quantity</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0 pcs'
          value={state.quantity}
          onChangeText={text => onChange('on-change-quantity', text)}
        />
        <Separator vertical={0.75} />
        <Text style={styles.titleField}>Type</Text>
        <Separator vertical={0.25} />
        <Dropdown
          items={['non-perishable', 'perishable']} // ['material', 'ingredient']
          selected={state.itemType}
          accentColor={type !== 'add' ? BACKGROUND_COLOR4 : BACKGROUND_COLOR}
          disabled={type !== 'add'}
          textDefaultStyle={{
            color: type !== 'add' ? WHITE : BACKGROUND_COLOR,
            fontWeight: type !== 'add' ? '100' : 'bold',
          }}
          defaultStyle={{
            backgroundColor: type !== 'add' ? BACKGROUND_COLOR3 : ACCENT_COLOR,
            color: WHITE,
            boxShadow:
              type !== 'add'
                ? 'none'
                : 'box-shadow: 0.25vh 0.25vh 0.25vh rgba(0, 0, 0, 0.25)',
          }}
          onSelected={item => onClick('on-select-item-type', item)}
          style={styles.dropdown}
        />
        <Separator vertical={0.75} />
        {state.itemType === 'perishable' && (
          <>
            <Text style={styles.titleField}>Perishable</Text>
            <Separator vertical={0.25} />
            <Button
              skin={styles.buttonPropertySkin}
              body={styles.buttonPropertyBody}
              onPress={() => onClick('on-show-perishable-props-dialog')}>
              <Text style={styles.buttonPropertyText}>Properties</Text>
              <Icon font='Feather' name='menu' size='2.5vh' color={BACKGROUND_COLOR} />
            </Button>
            <Separator vertical={0.75} />
          </>
        )}
        <Text style={styles.titleField}>Cost per item</Text>
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
            disabled={loading.status}
            skin={styles.button}
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
              disabled={loading.status}
              skin={styles.buttonDelete}
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

const stateProps = ({loading}) => ({
  loading,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(Item);
