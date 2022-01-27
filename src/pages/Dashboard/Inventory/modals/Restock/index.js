import {useContext, useEffect, useReducer} from 'react';
import {Button, DatePicker, Separator, Text, TextInput, View} from 'components';
import {restock, restockInitState} from 'hooks';
import Formatter from 'utils/Formatter';
import {isDouble, isInteger} from 'utils/checker';
import {Toast} from 'context';
import {connect} from 'react-redux';
import {CLEAR_LOADING} from 'ducks/actions';
import styles from './.module.css';
import {BACKGROUND_COLOR} from 'constants/colors';
import {hp} from 'utils/helper';

function Restock({loading, dispatch, item = {}, onRestock, onCancel}) {
  const {name, type, perishable_properties = {}} = item;
  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useReducer(
    restock,
    restockInitState({expiry_date: perishable_properties.expiry_date}),
  );

  const onClean = state => {
    if (!state.cost || !state.quantity) {
      return {status: false, error: 'Please enter all the inputs'};
    }

    let payload = {...item};
    payload.name = name;
    payload.type = type;
    payload.quantity = parseInt(state.quantity);
    payload.cost = parseFloat(state.cost);
    payload.date_modified = new Date().getTime();
    payload.perishable_properties = {};

    if (type === 'perishable') {
      payload.perishable_properties = {
        ...item.perishable_properties,
        expiry_date: new Date(state.expiry_date).getTime(),
      };
    }

    return {status: true, payload};
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-quantity') {
      if (isInteger(value) || value.length === 0) {
        setState({
          type: 'set',
          quantity: value,
        });
      }
      return;
    }
    if (actionType === 'on-change-cost') {
      if (isDouble(value) || value.length === 0) {
        setState({
          type: 'set',
          cost: value,
        });
      }
    }
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-click-restock') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onShowToast('Enter Missing Field');
        return;
      }
      onRestock(isClean.payload);
      return;
    }
    if (actionType === 'on-select-expiry-date') {
      setState({type: 'set', expiry_date: value});
    }
  };
  const requestListener = () => {
    if (!loading.status && loading.message === 'done') {
      onCancel();
      dispatch(CLEAR_LOADING());
    }
  };

  useEffect(requestListener, [loading]);

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Restock {Formatter.toName(name)}</Text>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Quantity</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0'
          value={state.quantity}
          onChangeText={text => onChange('on-change-quantity', text)}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Cost per item</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0.00'
          value={state.cost}
          onChangeText={text => onChange('on-change-cost', text)}
        />
        {type === 'perishable' && (
          <>
            <Separator vertical={1} />
            <Text style={styles.titleField}>Expiry date</Text>
            <Separator vertical={0.25} />
            <DatePicker
              style={styles.datePicker}
              textStyle={styles.datePickerText}
              formatType='standard'
              showIcon
              iconSize={hp(2.5)}
              iconColor={BACKGROUND_COLOR}
              date={state.expiry_date}
              onSelectedDate={date => onClick('on-select-expiry-date', date)}
            />
          </>
        )}
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        <Button
          skin={styles.button}
          title='Restock'
          isLoading={loading.status}
          onPress={() => onClick('on-click-restock')}
        />
        <Separator horizontal={1} />
        <Button
          skin={styles.button}
          title='Cancel'
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
export default connect(stateProps, dispatchProps)(Restock);
