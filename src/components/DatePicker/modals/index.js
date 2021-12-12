import {useState} from 'react';
import {Text, View, Button} from 'components';
import Dropdown from 'components/Dropdown';
import Formatter from 'utils/Formatter';
import {getMonthDays, getYears, month} from '../constants';
import styles from './.module.css';

export default function Picker({
  onHide,
  style,
  title,
  hideDateSelection,
  date,
  startDate,
  endDate,
  onOkay,
}) {
  const [state, setState] = useState({
    month: date.getMonth() + 1,
    day: Formatter.numberFormatter(date.getDate()),
    year: date.getFullYear(),
  });

  const onClick = (action, value) => {
    if (action === 'on-click-okay') {
      const month = Formatter.monthTerm(parseInt(state.month) - 1);
      onOkay(new Date(`${month} ${state.day} ${state.year}`));
      return;
    }
    if (action === 'on-select-month') {
      const month = Formatter.numberFormatter(Formatter.monthNumber(value));
      setState(prev => ({...prev, month, day: '01'}));
      return;
    }
    if (action === 'on-select-day') {
      setState(prev => ({...prev, day: value}));
      return;
    }
    if (action === 'on-select-year') {
      setState(prev => ({...prev, year: value, day: '01'}));
      return;
    }
  };
  return (
    <View style={styles.blankPane} onClick={() => onHide()}>
      <View style={`${styles.mainPane} ${style}`} onClick={e => e.stopPropagation()}>
        <View style={styles.bodyPane}>
          {title && (
            <View style={styles.titlePane}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          <View style={styles.datePane}>
            <Dropdown
              style={styles.dropdownMonth}
              textStyle={styles.dropdownText}
              items={month}
              selected={Formatter.monthTerm(parseInt(state.month) - 1)}
              onSelected={item => onClick('on-select-month', item)}
              placeholder='month'
              hideIcon
            />
            {!hideDateSelection && (
              <Dropdown
                style={styles.dropdownDay}
                textStyle={styles.dropdownText}
                items={getMonthDays(parseInt(state.month), parseInt(state.year))}
                selected={state.day}
                onSelected={item => onClick('on-select-day', item)}
                placeholder='day'
                hideIcon
              />
            )}
            <Dropdown
              style={styles.dropdownYear}
              textStyle={styles.dropdownText}
              items={getYears(startDate, endDate)}
              selected={state.year}
              onSelected={item => onClick('on-select-year', item)}
              placeholder='year'
              hideIcon
            />
          </View>
        </View>
        <View style={styles.bottomPane}>
          <Button
            title='OKAY'
            skin={styles.button}
            onClick={() => onClick('on-click-okay')}
          />
        </View>
      </View>
    </View>
  );
}
