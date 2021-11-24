import {useEffect, useReducer} from 'react';
import {Text, View} from 'components';
import {monthTerm, numberFormatter} from 'utils/Formatter';
import datePicker, {datePickerInitState} from './reducer';
import styles from './.module.css';
import Picker from './modals';

export default function DatePicker({
  type = 'date',
  formatType = 'numeric',
  date,
  startDate,
  endDate,
  pickerStyle,
  onSelectedDate,
  title,
  style,
}) {
  const [state, setState] = useReducer(
    datePicker,
    datePickerInitState({date, startDate, endDate}),
  );

  const getDatePickerType = type => {
    if (type === 'date-time') {
      return `- ${state.hours}:${state.mins} ${state.meridian}`;
    }
    return '';
  };
  const getFormatType = (formatType, value) => {
    if (formatType === 'standard') {
      return monthTerm(parseInt(value) - 1);
    }
    return value;
  };

  const onClick = (action, value) => {
    if (action === 'on-picker-show') {
      setState({type: 'set', isPickerShow: !state.isPickerShow});
      return;
    }
    if (action === 'on-picker-hide') {
      setState({type: 'set', isPickerShow: false});
    }
    if (action === 'on-picker-select-date') {
      onSelectedDate(value);
      setState({type: 'set', isPickerShow: false, date: value});
      return;
    }
  };

  return (
    <>
      <View
        style={`${styles.mainPane} ${style}`}
        onClick={() => onClick('on-picker-show')}>
        <Text style={styles.text}>{`${getFormatType(
          formatType,
          state.date.getMonth() + 1,
        )} ${numberFormatter(state.date.getDate())}, ${numberFormatter(
          state.date.getFullYear(),
        )} ${getDatePickerType(type)}`}</Text>
      </View>
      {state.isPickerShow && (
        <Picker
          title={title}
          date={state.date}
          startDate={startDate || state.startDate}
          endDate={endDate || state.endDate}
          style={pickerStyle}
          onHide={() => onClick('on-picker-hide')}
          onOkay={date => onClick('on-picker-select-date', date)}
        />
      )}
    </>
  );
}
