import {useContext, useReducer} from 'react';
import {Separator, Text, TextInput, Dropdown, View, DatePicker, Button} from 'components';
import {Toast} from 'context';
import {isInteger, isString, isName, isDouble} from 'utils/checker';
import {BACKGROUND_COLOR} from 'constants/colors';
import {perishable, perishableInitState} from 'hooks';
import styles from './.module.css';
import {hp} from 'utils/helper';
import {UNITS} from 'constants/strings';

export default function PerishableProperties({
  type,
  perishableProperties = {},
  onSave,
  onCancel,
}) {
  const {unit, current_unit, unit_type, expiry_date} = perishableProperties;
  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useReducer(
    perishable,
    perishableInitState({unit, current_unit, unit_type, expiry_date}),
  );

  const onClean = state => {
    if (!parseInt(state.unit) || !state.unit_type || !state.expiry_date) {
      return {status: false, error: 'Please fill up all the inputs'};
    }

    let payload = state;
    payload.unit = parseInt(state.unit);
    payload.current_unit = parseFloat(state.current_unit ? state.current_unit : '0');
    payload.expiry_date = new Date(state.expiry_date).getTime();

    return {
      status: true,
      payload,
    };
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-unit' && isInteger(value)) {
      if (type === 'add') setState({type: 'set', current_unit: value});
      setState({type: 'set', unit: value});
      return;
    }
    if (
      actionType === 'on-change-current-unit' &&
      isDouble(value ? value : '0') &&
      parseFloat(value ? value : '0') <= state.unit
    ) {
      setState({type: 'set', current_unit: value});
      return;
    }
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-click-save') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onShowToast(isClean.error);
        return;
      }
      onSave(isClean.payload);
      onCancel();
    }
    if (actionType === 'on-select-unit-type' && isName(value)) {
      setState({type: 'set', unit_type: value});
      return;
    }
    if (actionType === 'on-select-expiry-date') {
      setState({type: 'set', expiry_date: value});
      return;
    }
  };

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Perishable Item</Text>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Unit</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0'
          value={state.unit}
          onChangeText={text => onChange('on-change-unit', text)}
        />
        <Separator vertical={0.75} />
        <Text style={styles.titleField}>Current Unit</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0'
          disabled={type === 'add'}
          defaultStyle={{
            boxShadow:
              type === 'add'
                ? 'none'
                : 'box-shadow: 0.25vh 0.25vh 0.25vh rgba(0, 0, 0, 0.25)',
          }}
          value={type === 'add' ? state.unit : state.current_unit}
          onChangeText={text => onChange('on-change-current-unit', text)}
        />
        <Separator vertical={0.75} />
        <Text style={styles.titleField}>Unit Type</Text>
        <Separator vertical={0.25} />
        <Dropdown
          items={UNITS}
          selected={state.unit_type}
          onSelected={item => onClick('on-select-unit-type', item)}
          style={styles.dropdown}
          accentColor={BACKGROUND_COLOR}
        />
        <Separator vertical={0.75} />
        <Text style={styles.titleField}>Expiry Date</Text>
        <Separator vertical={0.25} />
        <DatePicker
          style={styles.datePicker}
          textStyle={styles.datePickerText}
          formatType='standard'
          showIcon
          iconSize={hp(2.5)}
          iconColor={BACKGROUND_COLOR}
          date={state.expiry_date || expiry_date}
          onSelectedDate={date => onClick('on-select-expiry-date', date)}
        />
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        <Button
          skin={styles.button}
          title='Save'
          onPress={() => onClick('on-click-save')}
        />
        <Separator horizontal={1} />
        <Button skin={styles.button} title='Cancel' onPress={onCancel} />
      </View>
    </View>
  );
}
